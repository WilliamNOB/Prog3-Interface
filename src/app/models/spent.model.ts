//Terminar de hacer relaciones con conductor, propietario, servicios y viaticos

import { Driver } from "./driver.model";
import { Expense } from "./expense.model";
import { Owner } from "./owner.model";
import { Service } from "./service.model";


export class Spent {
    id?:number;
   // driver?:Driver;
    //owner?:Owner;
    //expenses?:Expense;
   // service?:Service
    driver_id?:number;
    owner_id?:number;
    travel_expense_id?:number;
    service_id?:number;

}
