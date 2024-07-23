import mongoose from "mongoose";

const Schema = mongoose.Schema;

const busSchema = new Schema({
    busNumber: { type: String, required: true },
    seatingCapacity: { type: Number, default: 10 },
    amenities: { type: String },
    route: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
    bookedSeats: { type: [Number], default: [] },
    availableSeats:{type:[Number],default:[1,2,3,4,5,6,7,8,9,10]},
}
, {
    timestamps: true
});

export const Bus = mongoose.model('Bus', busSchema);


