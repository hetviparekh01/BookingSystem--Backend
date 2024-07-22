import { inject } from "inversify";
import { RouteService } from "../services";
import { TYPES } from "../constants";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import { errorHandle } from "../utils/errorHandler";
import { RoleMiddleWare } from "../middlewares";

@controller("/route",TYPES.AuthMiddleware,RoleMiddleWare(['admin']))
export class RouteController {
    constructor(@inject<RouteService>(TYPES.RouteService) private routeService: RouteService) { }

    @httpPost("/addRoute")
    async addRoute(req: Request, res: Response) {
        try {
            const routeData=req.body;
            await this.routeService.addRoute(routeData);
            res.status(201).json({ status: true, message: "Route added successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpPut("/updateRoute/:id")
    async updateRoute(req: Request, res: Response) {
        try {
            const routeData = req.body
            await this.routeService.updateRoute(req.params.id, routeData);
            res.status(201).json({ status: true, message: "Route updated successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpDelete("/deleteRoute/:id")
    async deleteRoute(req: Request, res: Response) {
        try {
            await this.routeService.deleteRoute(req.params.id);
            res.status(201).json({ status: true, message: "Route deleted successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpGet("/getRoutes")
    async getRoutes(req: Request, res: Response) {
        try {
            const routes = await this.routeService.getRoute();
            res.status(201).json({ status: true, data: routes })
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpGet("/getRouteById/:id")
    async getRouteById(req: Request, res: Response) {
        try {
            const route = await this.routeService.getRouteById(req.params.id);
            res.status(201).json({ status: true, data: route })
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }



}