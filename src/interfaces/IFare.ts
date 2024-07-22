import { Schema } from "mongoose";

export interface IFare extends Document {
    route: Schema.Types.ObjectId;
    baseFarePekm: number;
    taxPercentage: number;
    pricePerKm?: number;
    
}