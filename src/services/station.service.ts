import { injectable } from "inversify";
import { IStattion } from "../interfaces";
import { Station } from "../models";

@injectable()
export class StationService{
  
    async addSation(stationData:IStattion){
        try {
            await Station.create(stationData)
        } catch (error:any) {
            throw(error)
        }
    }

    async updateStation(stationId:string,stationData:IStattion){
        try {
            await Station.findByIdAndUpdate(stationId,stationData)
        } catch (error:any) {
            throw(error)
        }
    }

    async deleteStation(stationId:string){
        try {
            await Station.findByIdAndDelete(stationId)
        } catch (error:any) {
            throw(error)
        }
    }

    async getAllStations(): Promise<IStattion[]>{
        try {
            return await Station.find({})
        } catch (error:any) {
            throw(error)
        }
    }



}