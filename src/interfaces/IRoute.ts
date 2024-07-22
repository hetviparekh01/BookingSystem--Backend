import { Schema } from "mongoose";

export interface IRoute{
    distance: number;
    stations: Schema.Types.ObjectId[];
    segments: {
        fromStation: Schema.Types.ObjectId;
        toStation: Schema.Types.ObjectId;
        distancekm: number;
        timeMin: number;
    }[];
}