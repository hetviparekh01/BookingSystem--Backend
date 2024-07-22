import mongoose from "mongoose";

const Schema = mongoose.Schema;

const stationSchema = new Schema({
    name: { type: String, required: true }
},{
    timestamps:true
});

export const Station = mongoose.model('Station', stationSchema);

