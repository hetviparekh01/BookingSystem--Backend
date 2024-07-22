import { inject } from "inversify";
import { TYPES } from "../constants";
import { BookingService } from "../services";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import { errorHandle } from "../utils/errorHandler";
import { RoleMiddleWare } from "../middlewares";

@controller("/booking",TYPES.AuthMiddleware)
export class BookingController{
    constructor(@inject<BookingService>(TYPES.BookingService) private bookingService: BookingService) { }

    @httpPost("/addbooking",RoleMiddleWare(['admin','user']))
    async addbooking(req: Request, res: Response) {
        try {
            const bookingData=req.body;
            bookingData.user=req.headers._id;
            await this.bookingService.addBooking(bookingData);
            res.status(201).json({ status: true, message: "Ticket Booked Sucessfully" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpPut("/updatebooking/:id")
    async updatebooking(req: Request, res: Response) {
        try {
            const bookingData = req.body
            await this.bookingService.updateBooking(req.params.id, bookingData);
            res.status(201).json({ status: true, message: "booking updated successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpDelete("/deletebooking/:id")
    async deletebooking(req: Request, res: Response) {
        try {
            await this.bookingService.deleteBooking(req.params.id);
            res.status(201).json({ status: true, message: "booking deleted successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpGet("/getbookings",RoleMiddleWare(['admin']))
    async getbookings(req: Request, res: Response) {
        try {
            const bookings = await this.bookingService.getBooking();
            res.status(201).json({ status: true, data: bookings })
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpGet("/getbookingById/:id",RoleMiddleWare(['admin','user']))
    async getbookingById(req: Request, res: Response) {
        try {
            const booking = await this.bookingService.getBookingById(req.params.id);
            res.status(201).json({ status: true, data: booking })
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }
}