import { injectable } from "inversify";
import { IBus } from "../interfaces";
import { Bus } from "../models";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

@injectable()
export class BusService {
    async addBus(busData: IBus) {
        try {
            await Bus.create(busData)
        } catch (error: any) {
            throw (error)
        }
    }

    async updateBus(busId: string, busData: IBus) {
        try {
            await Bus.findByIdAndUpdate(busId, busData, { new: true })
        } catch (error: any) {
            throw (error)
        }
    }

    async deleteBus(busId: string) {
        try {
            await Bus.findByIdAndDelete(busId)
        } catch (error: any) {
            throw (error)
        }
    }

    async getBus(queryParams: any) {
        try {
            const fromStation: string = queryParams.fromStation;
            const toStation: string = queryParams.toStation;
          const buses = await Bus.aggregate([
            {
              $lookup: {
                from: "busschedules",
                localField: "_id",
                foreignField: "bus",
                as: "scheduleData"
              }
            },
            {
              $lookup: {
                from: "routes",
                localField: "route",
                foreignField: "_id",
                as: "routeDetail"
              }
            },
            {
              $unwind: {
                path: "$routeDetail"
              }
            },
            {
              $unwind: { path: "$routeDetail.stops" }
            },
            {
              $lookup: {
                from: "stations",
                localField: "routeDetail.stops.fromStation",
                foreignField: "_id",
                as: "fromStationDetails"
              }
            },
            {
              $unwind: { path: "$fromStationDetails" }
            },
            {
              $lookup: {
                from: "stations",
                localField: "routeDetail.stops.toStation",
                foreignField: "_id",
                as: "toStationDetails"
              }
            },
            {
              $unwind: { path: "$toStationDetails" }
            },
            {
              $match: {
                "fromStationDetails.name": fromStation,
                "toStationDetails.name": toStation,
              }
            },
            {
              $group: {
                _id: "$_id",
                busNumber: { $first: "$busNumber" },
                seatingCapacity: { $first: "$seatingCapacity" },
                amenities: { $first: "$amenities" },
                route: { $first: "$route" },
                availableSeats: { $first: "$availableSeats" },
                bookedSeats: { $first: "$bookedSeats" },
                routeDetail: {
                  $push: {
                    stop: "$routeDetail.stops._id",
                    fromStation: "$fromStationDetails.name",
                    toStation: "$toStationDetails.name",
                    distancekm: "$routeDetail.stops.distancekm",
                    timeMin: "$routeDetail.stops.timeMin"
                  }
                },
                scheduleData: { $first: "$scheduleData" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" }
              }
            },
            {
              $addFields: {
                scheduleData: {
                  $filter: {
                    input: "$scheduleData",
                    as: "schedule",
                    cond: { $eq: ["$$schedule.stop", { $arrayElemAt: ["$routeDetail.stop", 0] }] }
                  }
                }
              }
            },
            {
              $project: {
                _id: 1,
                busNumber: 1,
                seatingCapacity: 1,
                amenities: 1,
                route: 1,
                availableSeats: 1,
                bookedSeats: 1,
                routeDetail: 1,
                scheduleData: 1,
                createdAt: 1,
                updatedAt: 1
              }
            },
              ]
              )
            return buses
        } catch (error: any) {
            throw (error)
        }
    }

    async getAllBuses() {
        try {
          const bus = await Bus.aggregate([{
            $lookup: {
              from: "routes",
              localField: "route",
              foreignField: "_id",
              as: "routeDetail"
            }
          },
            {
              $unwind: {
                path: "$routeDetail"
              }
            }])
            return bus
        } catch (error: any) {  
            throw (error)
        }
    }

    async getBusById(busId: string) {
        try {
          const bus = await Bus.aggregate([
            
            {
              $match: {
                _id: new ObjectId(busId)
              }
            },
            {
              $lookup: {
                from: "routes",
                localField: "route",
                foreignField: "_id",
                as: "routeDetail",
              }
            },
            {
              $unwind: {
                path: "$routeDetail",
              }
            },
          ])
            return bus
        } catch (error: any) {
            throw (error)
        }
    }
}