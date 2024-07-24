import { inject } from "inversify";
import { StationService } from "../services";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import { errorHandle } from "../utils/errorHandler";
import { TYPES } from "../constants";
import { RoleMiddleWare } from "../middlewares";

@controller("/station",TYPES.AuthMiddleware,RoleMiddleWare(['admin']))
export class StationController{
    constructor(@inject<StationService>(TYPES.StationService) private stationService: StationService) { }

    @httpPost("/addStation")
    async addStation(req: Request, res: Response) {
        try {
            const stationData=req.body;
            await this.stationService.addSation(stationData);
            res.status(201).json({ status: true, message: "station added successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }       
    }

    @httpPut("/updatestation/:id")
    async updatestation(req: Request, res: Response) {
        try {
            const stationData = req.body
            await this.stationService.updateStation(req.params.id, stationData);
            res.status(201).json({ status: true, message: "station updated successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpDelete("/deletestation/:id")
    async deletestation(req: Request, res: Response) {
        try {
            await this.stationService.deleteStation(req.params.id);
            res.status(201).json({ status: true, message: "station deleted successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpGet("/getstations")
    async getstations(req: Request, res: Response) {
        try {
            const stations = await this.stationService.getAllStations();
            res.status(201).json({ status: true, data: stations })
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

  
}