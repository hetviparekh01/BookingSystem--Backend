import mongoose, { Schema } from "mongoose";
import BusSchedule from "./busSchedule.model";
import { Bus } from "./bus.model";

const bookingSchema = new Schema({
    busSchedule: { type: Schema.Types.ObjectId, ref: 'BusSchedule', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookingDate: { type: Date, required:true },
    seatNumber: { type: Number }
}, {
    timestamps: true
});

bookingSchema.pre('save', async function(next) {
    try {
        const busSchedule = await BusSchedule.findById(this.busSchedule);
    
        if (!busSchedule) {
            throw new Error('Bus schedule not found');
        }

        const existingBooking = await Booking.findOne({
            busSchedule: this.busSchedule,
            bookingDate: this.bookingDate,
            seatNumber: this.seatNumber
        });

        if (existingBooking) {
            throw new Error('Seat already booked for this bus schedule and date.');
        }

        const bus = await Bus.findById(busSchedule.bus);

        if (!bus) {
            throw new Error('Bus not found');
        }
        
        if (this.seatNumber) {
            if (this.seatNumber < 1 || this.seatNumber > bus.seatingCapacity) {
                throw new Error(`Seat number ${this.seatNumber} is not valid for this bus.`);
            }

            if (!bus.availableSeats.includes(this.seatNumber)) {
                throw new Error(`Seat number ${this.seatNumber} is already booked.`);
            }

            bus.availableSeats = bus.availableSeats.filter(seat => seat !== this.seatNumber);
            bus.bookedSeats.push(this.seatNumber);

            await bus.save();
        }

        next();
    } catch (err:any) {
        next(err);
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
