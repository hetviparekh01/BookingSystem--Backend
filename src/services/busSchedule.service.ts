import { injectable } from "inversify";
import { IBusSchedule } from "../interfaces";
import BusSchedule from "../models/busSchedule.model";
import { ObjectId } from "mongodb";

@injectable()
export class BusScheduleService{
    async addBusSchedule(scheduleData:IBusSchedule){
        try {
            return await BusSchedule.create(scheduleData);
        } catch (error:any) {
            throw error;
        }
    }

    async updateBusSchedule(scheduleId:string,scheduleData:IBusSchedule){
        try {
            const schedule=await BusSchedule.findByIdAndUpdate(scheduleId,scheduleData,{new:true})
            if(!schedule){
                throw new Error('Bus schedule not found')
            }
            return schedule;
        } catch (error:any) {
            throw error;
        }
    }

    async deleteBusSchedule(scheduleId:string){
        try {
            const schedule=await BusSchedule.findByIdAndDelete(scheduleId)
            if(!schedule){
                throw new Error('Bus schedule not found')
            }
            return schedule;
        } catch (error:any) {
            throw error;
        }
    }

    async getBusSchedule(){
        try {
            const schedules= await BusSchedule.find();
            return schedules
        } catch (error:any) {
            throw error;
        }
    }

    async getBusSchduleById(scheduleId:string){
        try {
            const schedule = await BusSchedule.aggregate([
                {
                    $match: {
                        _id: new ObjectId(scheduleId)
                    }
                },
                {
                    $lookup: {
                        from: "buses",
                        localField: "bus",
                        foreignField: "_id",
                        as: "busDetails"
                    }
                },
                {
                    $unwind: {
                        path: "$busDetails",
                    }
                },
            ]);
            if(!schedule){
                throw new Error('Bus schedule not found')
            }
            return schedule;
        } catch (error:any) {
            throw error;
        }
    }

}