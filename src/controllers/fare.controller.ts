import { inject } from "inversify";
import { TYPES } from "../constants";
import { FareService } from "../services";
import { Request, Response, NextFunction } from "express";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { errorHandle } from "../utils/errorHandler";
import { RoleMiddleWare } from "../middlewares";

@controller('/fare',TYPES.AuthMiddleware,RoleMiddleWare(['admin']))
export class FareController{
    constructor(@inject<FareService>(TYPES.FareService) private fareService:FareService){}

    @httpPost("/addfare")
    async addfare(req: Request, res: Response) {
        try {
            const fareData=req.body;
            await this.fareService.addFare(fareData);
            res.status(201).json({ status: true, message: "fare added successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpPut("/updatefare/:id")
    async updatefare(req: Request, res: Response) {
        try {
            const fareData = req.body
            await this.fareService.updateFare(req.params.id, fareData);
            res.status(201).json({ status: true, message: "fare updated successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpDelete("/deletefare/:id")
    async deletefare(req: Request, res: Response) {
        try {
            await this.fareService.deleteFare(req.params.id);
            res.status(201).json({ status: true, message: "fare deleted successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpGet("/getfares")
    async getfares(req: Request, res: Response) {
        try {
            const fares = await this.fareService.getFare();
            res.status(201).json({ status: true, data: fares })
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }
}