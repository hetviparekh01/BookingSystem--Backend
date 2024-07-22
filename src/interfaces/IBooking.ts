import { Types } from "mongoose";

export interface IBooking extends Document {
    busSchedule: Types.ObjectId;
    user: Types.ObjectId;
    bookingDate: Date;
    seatNumber: number;
    fareAmount:number
}