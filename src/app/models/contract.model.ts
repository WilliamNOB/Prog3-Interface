import { Order } from "./order.model"
import { Route } from "./route.model"
import { Service } from "./service.model"

export class Contract {
    id?:number;
    description?: string;
    date: Date;
    customer_id?:number;
    /*route:Route;
    order:Order
    service:Service*/
}
