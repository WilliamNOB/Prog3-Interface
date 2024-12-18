import { Service } from "./service.model";

export class Administrator {
  id?: number;
  user_id: string;
  //service_id: number;
  //vehicles_driver:VehiclesDriver
  //intento de crear usuario
  email?:string
  password?:string
  name?: String
  service?: Service; // crear relacion uno a uno con servicio
}
