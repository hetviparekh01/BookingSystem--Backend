import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { BusService } from "../services";
import { TYPES } from "../constants";
import { Request, Response, NextFunction } from "express";
import { errorHandle } from "../utils/errorHandler";
import { RoleMiddleWare } from "../middlewares";

@controller("/bus",TYPES.AuthMiddleware)
export class BusController{
    constructor(@inject<BusService>(TYPES.BusService) private busService: BusService) { }

    @httpPost("/addbus",RoleMiddleWare(['admin']))
    async addbus(req: Request, res: Response) {
        try {
            const busData=req.body;
            await this.busService.addBus(busData);
            res.status(201).json({ status: true, message: "bus added successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpPut("/updatebus/:id",RoleMiddleWare(['admin']))
    async updatebus(req: Request, res: Response) {
        try {
            const busData = req.body
            await this.busService.updateBus(req.params.id, busData);
            res.status(201).json({ status: true, message: "bus updated successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpDelete("/deletebus/:id",RoleMiddleWare(['admin']))
    async deletebus(req: Request, res: Response) {
        try {
            await this.busService.deleteBus(req.params.id);
            res.status(201).json({ status: true, message: "bus deleted successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpPost("/getbuses",RoleMiddleWare(['admin','user']))
    async getbuss(req: Request, res: Response) {
        try {
            const queryParams:any=req.body
            const buss = await this.busService.getBus(queryParams);
            res.status(201).json({ status: true, data: buss })
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpGet("/getAllBuses",RoleMiddleWare(['admin']))
    async getAllBuses(req: Request, res: Response) {
        try {
            const bus = await this.busService.getAllBuses();
            res.status(201).json({ status: true, data: bus })
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }
    @httpGet("/getBusById/:id",RoleMiddleWare(['admin','user']))
    async getbusById(req: Request, res: Response) {
        try {
            const bus = await this.busService.getBusById(req.params.id);
            res.status(201).json({ status: true, data: bus })
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

}