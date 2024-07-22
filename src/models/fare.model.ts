import mongoose, { Schema } from "mongoose";
import { Route } from "./route.model";

const fareSchema = new Schema({
    route: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
    baseFarePerkm: { type: Number, required: true },
    taxPercentage: { type: Number, required: true },
    stopsFares: [{
        stop: { type: Schema.Types.ObjectId, ref: 'Stop', required: true },
        pricePerKm: { type: Number },
        totalAmt: { type: Number }  
    }],
    totalAmt: { type: Number }
}, {
    timestamps: true
});

fareSchema.pre('save', async function (next) {
    try {
        const route = await Route.findById(this.route);
        if (!route) {
            throw new Error('Route not found');
        }
        
        let totalFare = 0;

        for (let stop of route.stops) {
            const pricePerKm = this.baseFarePerkm * (1 + this.taxPercentage / 100);
            const stopDistance = stop.distancekm;
            const stopFare = pricePerKm * stopDistance;

            totalFare += stopFare;

            
            this.stopsFares.push({
                stop: stop._id,
                pricePerKm: pricePerKm,
                totalAmt: stopFare
            });
        }

        this.totalAmt = totalFare;

        next();
    } catch (err:any) {
        next(err);
    }
});

const Fare = mongoose.model('Fare', fareSchema);

export default Fare;
