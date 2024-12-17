import { Service } from "./service.model";

export class Tranches {
    id?:number
    origin:number;
    destination:number;
    start_date:Date;
    end_date:Date;
    route_id:number;
    vehicle_driver_id:number
    //service:Service
}
