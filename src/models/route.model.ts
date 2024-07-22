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

export const Route=mongoose.model("Route",routeSchema)
