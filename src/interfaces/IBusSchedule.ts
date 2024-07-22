import { Schema } from "mongoose";

export interface IBusSchedule  {
    bus: Schema.Types.ObjectId;
    route: Schema.Types.ObjectId;
    segment: number;
    departureTime: String;
}