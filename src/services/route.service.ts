import { injectable } from "inversify";
import { Route } from "../models";
import { IRoute } from "../interfaces";

@injectable()
export class RouteService{
    async addRoute(routeData:IRoute){
        try {
            const stations = routeData.stations.map((element: any) => element.stationId);
            routeData.stations=stations       
            await Route.create(routeData)
        } catch (error:any) {
            throw(error)
        }
    }

    async updateRoute(routeId:string,routeData:IRoute){
        try {
            const route = await Route.findByIdAndUpdate(routeId,routeData,{new:true})
            if(!route){
                throw new Error("Route not found")
            }
        } catch (error:any) {
            throw(error)
        }
    }

    async deleteRoute(routeId:string){
        try {
            await Route.findByIdAndDelete(routeId)
        } catch (error:any) {
            throw(error)
        }
    }

    async getRoute(){
        try {
            const routes = await Route.aggregate([
                {
                    $unwind: {
                        path: "$stops"
                    }
                },
                {
                    $lookup: {
                        from: "stations",
                        localField: "stations",
                        foreignField: "_id",
                        as: "stationDetails"
                    }
                },
                {
                    $addFields: {
                        stationNames: {
                            $map: {
                                "input": "$stationDetails",
                                "as": "station",
                                "in": "$$station.name"
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "stations",
                        localField: "stops.fromStation",
                        foreignField: "_id",
                        as: "fromStationDetails"
                    }
                },
                {
                    $unwind: {
                        path: "$fromStationDetails",
                    }
                },
                {
                    $lookup: {
                        from: "stations",
                        localField: "stops.toStation",
                        foreignField: "_id",
                        as: "toStationDetails"
                    }
                },
                {
                    $unwind: {
                        path: "$toStationDetails",
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        distance: { $first: '$distance' },
                        stations: { $first: '$stationNames' },
                        stopsArray: {
                            $push: {
                                fromStation: "$fromStationDetails.name",
                                toStation: "$toStationDetails.name",
                                distancekm: "$stops.distancekm",
                                timeMin: "$stops.timeMin",
                                _id: "$stops._id"
                            }
                        },
                        stationsArray: {
                            $push: {

                            }
                        },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" }
                    }
                },

            ])
            return routes
        } catch (error:any) {
            throw(error)
        }
    }

    async getRouteById(routeId:string){
        try {
            const route = await Route.findById(routeId)
            if(!route){
                throw new Error("Route not found")
            }
            return route
        } catch (error:any) {
            throw(error)
        }
    }
}