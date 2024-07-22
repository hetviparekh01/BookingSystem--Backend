import { Container } from "inversify";
import { TYPES } from "./constants";
import { AuthService, BookingService, BusScheduleService, BusService, FareService, RouteService, StationService, UserService } from "./services";
import { AuthMiddleware } from "./middlewares";

const container=new Container()

container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<RouteService>(TYPES.RouteService).to(RouteService);
container.bind<FareService>(TYPES.FareService).to(FareService);
container.bind<BusService>(TYPES.BusService).to(BusService);
container.bind<BusScheduleService>(TYPES.BusScheduleService).to(BusScheduleService);
container.bind<StationService>(TYPES.StationService).to(StationService);
container.bind<BookingService>(TYPES.BookingService).to(BookingService);
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);



export default container