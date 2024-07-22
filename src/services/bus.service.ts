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
                    from: "routes",
                    localField: "route",
                    foreignField: "_id",
                    as: "routeDetails"
                  }
                },
                {
                  $unwind: "$routeDetails"
                },
                {
                  $lookup: {
                    from: "stations",
                    localField: "routeDetails.segments.fromStation",
                    foreignField: "_id",
                    as: "fromStation"
                  }
                },
                {
                  $unwind: "$fromStation"
                },
                {
                  $lookup: {
                    from: "stations",
                    localField: "routeDetails.segments.toStation",
                    foreignField: "_id",
                    as: "toStation"
                  }
                },
                {
                  $unwind: "$toStation"
                },
                {
                  $lookup: {
                    from: "busschedules",
                    localField: "_id",
                    foreignField: "bus",
                    as: "BusSchedulesData"
                  }
                },
                {
                  $unwind: {
                    path: "$BusSchedulesData",
                    preserveNullAndEmptyArrays: true 
                  }
                },
                {
                  $match: {
                    $and: [
                      { "fromStation.name": fromStation },
                      { "toStation.name": toStation }
                    ]
                  }
                },
                {
                  $group: {
                    _id: "$_id",
                    busNumber: { $first: "$busNumber" }, 
                    seatingCapacity: { $first: "$seatingCapacity" },
                    amenities: { $first: "$amenities" },
                    route: { $first: "$route" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                    __v: { $first: "$__v" },
                    bookedSeats: { $first: "$bookedSeats" },
                    routeDetails: { $first: "$routeDetails" },
                    fromStation: { $first: "$fromStation" },
                    toStation: { $first: "$toStation" },
                    BusSchedulesData: { $push: "$BusSchedulesData" }
                  }
                }
              ]
              )
            return buses
        } catch (error: any) {
            throw (error)
        }
    }

    async getAllBuses() {
        try {
            const bus = await Bus.find({})
            return bus
        } catch (error: any) {
            throw (error)
        }
    }

    async getBusById(busId: string) {
        try {
            const bus = await Bus.aggregate([
                {
                $match: { _id: new ObjectId(busId) },
                },
                {
                    $lookup: {
                        from: 'busschedules',
                        localField: '_id',
                        foreignField: 'bus',
                        as: 'BusSchedulesData'
                    }
                }
            ])
            return bus
        } catch (error: any) {
            throw (error)
        }
    }
}