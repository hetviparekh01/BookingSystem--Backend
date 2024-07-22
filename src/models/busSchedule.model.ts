import mongoose, { Schema } from "mongoose";
import Fare from "./fare.model";  
const busScheduleSchema = new Schema({
    bus: { type: Schema.Types.ObjectId, ref: 'Bus', required: true },
    route: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
    stop: { type: Schema.Types.ObjectId, ref: 'Stop', required: true }, 
    departureTime: { type: String, required: true },
    totalFare: { type: Number }
}, {
    timestamps: true
});

busScheduleSchema.pre('save', async function(next) {
    try {
        const fare = await Fare.findOne({ route: this.route });
        if (!fare) {
            throw new Error('Fare not found for the route');
        }
        const stopFare = fare.stopsFares.find(f => f.stop.toString() === this.stop.toString());
        if (!stopFare) {
            throw new Error('Fare details not found for the stop');
        }
        this.totalFare = stopFare.totalAmt;
        next();
    } catch (err:any) {
        next(err);
    }
});

const BusSchedule = mongoose.model('BusSchedule', busScheduleSchema);

export default BusSchedule;
