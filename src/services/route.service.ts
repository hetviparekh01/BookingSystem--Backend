import { injectable } from "inversify";
import { Route } from "../models";
import { IRoute } from "../interfaces";

@injectable()
export class RouteService{
    async addRoute(routeData:IRoute){
        try {
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
            const routes = await Route.find({})
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