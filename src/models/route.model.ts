import mongoose, { Schema } from "mongoose";

const routeSchema = new Schema({
    name:{type:String,required:true},
    distance: { type: Number, required: true }, 
    stations: [{ type: Schema.Types.ObjectId, ref: 'Station' }],
    stops: [{
        fromStation: { type: Schema.Types.ObjectId, ref: 'Station', required: true },
        toStation: { type: Schema.Types.ObjectId, ref: 'Station', required: true },
        distancekm: { type: Number, required: true }, 
        timeMin: { type: Number, required: true } 
    }]
},{
    timestamps:true
});
routeSchema.pre('save',function(next){
    const route = this;
    const stationIds = route.stations.map(station => station.toString());

    const isValid = route.stops.every(stop =>
        stationIds.includes(stop.fromStation.toString()) &&
        stationIds.includes(stop.toStation.toString())
    );

    if (!isValid) {
        const err = new Error('Invalid stations in stops array');
        next(err);
    } else {
        next();
    }
})
export const Route=mongoose.model("Route",routeSchema)
