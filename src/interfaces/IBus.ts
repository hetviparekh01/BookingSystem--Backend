import { Schema } from "mongoose";

export interface IBus  {
    busNumber: string;
    seatingCapacity: number;
    amenities?: string;
    route: Schema.Types.ObjectId;
    startStation:Schema.Types.ObjectId;
    stopStation:Schema.Types.ObjectId
}