import { Spent } from "./spent.model";

export class Service {
    id?:number;
    amount:number;
    date_service:Date;
    administrator_id: number; //Administrador debe de existir
    tranch_id: number; //Tramo debe de existir  
    contract_id: number; //Contrato debe de existir
  

}
