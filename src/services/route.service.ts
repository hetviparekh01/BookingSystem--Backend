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
                    $lookup: {
                        from: 'stations',
                        localField: "stations",
                        foreignField: "_id",
                        as: "stationsdetail"
                    }
                },
                {
                    $addFields: {
                        stationNames: {
                            "$map": {
                                "input": "$stationsdetail",
                                "as": "station",
                                "in": "$$station.name"
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        stationNamesStr: {
                            $reduce: {
                                input: "$stationNames",
                                initialValue: "",
                                in: {
                                    $concat: [
                                        "$$value",
                                        { "$cond": { "if": { "$eq": ["$$value", ""] }, "then": "", "else": ", " } },
                                        "$$this"
                                    ]
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        "stations": 0,
                        "stationsdetail": 0,
                        "stationNames": 0
                    }
                }
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