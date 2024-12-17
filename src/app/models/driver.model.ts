import { User } from "./user.model";
import { VehiclesDriver } from "./vehicles-driver.model";

export class Driver {
    id?:number
    license:number;
    license_type:string;
    user_id?:string;
    //vehicles_driver:VehiclesDriver
    //intento de crear usuario
    email?:string
    password?:string
    name?: String
    
}
