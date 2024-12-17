import { VehiclesDriver } from "./vehicles-driver.model";

export class Vehicle {
    id?:number;
    plate:string;
    type:string;
    capacitity_kg:number;
    state?:string;
    transit_license:number;
    //vehicle_driver:VehiclesDriver
}
