import { injectable } from "inversify";
import { IBooking } from "../interfaces";
import Booking from "../models/booking.model";

@injectable()
export class BookingService{
    async addBooking(bookingData:IBooking){
        try {
            await Booking.create(bookingData)
        } catch (error:any) {
            throw(error)
        }
    }

    async updateBooking(bookingId:string,bookingData:IBooking){
        try {
            await Booking.findByIdAndUpdate(bookingId, bookingData, {new: true})
        } catch (error:any) {
            throw(error)
        }
    }

    async deleteBooking(bookingId:string){
        try {
            await Booking.findByIdAndDelete(bookingId)
        } catch (error:any) {
            throw(error)
        }
    }

    async getBooking(){
        try {
            const bookings = await Booking.find()
            return bookings
        } catch (error:any) {
            throw(error)
        }
    }

    async getBookingById(bookingId:string){
        try {
            const booking = await Booking.findById(bookingId)
            return booking
        } catch (error:any) {
            throw(error)
        }
    }
}