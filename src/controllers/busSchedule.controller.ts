import { inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { BusScheduleService } from "../services";
import { TYPES } from "../constants";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { errorHandle } from "../utils/errorHandler";
import { RoleMiddleWare } from "../middlewares";

@controller('/busSchedule',TYPES.AuthMiddleware,)
export class busScheduleScheduleController{
    constructor(@inject<BusScheduleService>(TYPES.BusScheduleService) private busScheduleService: BusScheduleService) { }

    @httpPost("/addbusSchedule", RoleMiddleWare(['admin']))
    async addbusSchedule(req: Request, res: Response) {
        try {
            const busScheduleData=req.body; 
            await this.busScheduleService.addBusSchedule(busScheduleData);
            res.status(201).json({ status: true, message: "busSchedule added successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpPut("/updatebusSchedule/:id", RoleMiddleWare(['admin']))
    async updatebusSchedule(req: Request, res: Response) {
        try {
            const busScheduleData = req.body
            await this.busScheduleService.updateBusSchedule(req.params.id, busScheduleData);
            res.status(201).json({ status: true, message: "busSchedule updated successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpDelete("/deletebusSchedule/:id", RoleMiddleWare(['admin']))
    async deletebusSchedule(req: Request, res: Response) {
        try {
            await this.busScheduleService.deleteBusSchedule(req.params.id);
            res.status(201).json({ status: true, message: "busSchedule deleted successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpGet("/getbusSchedules", RoleMiddleWare(['admin']))
    async getbusSchedules(req: Request, res: Response) {
        try {
            const busSchedules = await this.busScheduleService.getBusSchedule();    
            res.status(201).json({ status: true, data: busSchedules })
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpGet("/getbusScheduleById/:id", RoleMiddleWare(['admin','user']))
    async getbusScheduleById(req: Request, res: Response) {
        try {
            const busSchedule = await this.busScheduleService.getBusSchduleById(req.params.id);
            res.status(201).json({ status: true, data: busSchedule })
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }
}