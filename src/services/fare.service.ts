import { injectable } from "inversify";
import { IFare } from "../interfaces";
import Fare from "../models/fare.model";

@injectable()
export class FareService{
   
    async addFare(fareData:IFare){
        try {
            return await Fare.create(fareData);
        } catch (error:any) {
            throw (error);
        }
    }

    async updateFare(fareId:string,fareData:IFare){
        try {
            const fare=await Fare.findByIdAndUpdate(fareId,fareData,{new:true})
            if(!fare){
                throw new Error("Fare not found")
            }
            return fare
        } catch (error:any) {
            throw (error);
        }
    }

    async deleteFare(fareId:string){
        try {
            const fare=await Fare.findByIdAndDelete(fareId)
            if(!fare){
                throw new Error("Fare not found")
            }
            return fare
        } catch (error:any) {
            throw (error);
        }
    }

    async getFare(){
        try {
            const fares= await Fare.find()
            return fares
        } catch (error:any) {
            throw (error);
        }
    }

    async getFareById(fareId:string){
        try {
            const fare= await Fare.findById(fareId)
            if(!fare){
                throw new Error("Fare not found")
            }
            return fare
        } catch (error:any) {
            throw (error);
        }
    }
}