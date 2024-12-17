import { Hotel } from "./hotel.model";
import { Restaurant } from "./restaurant.model";

export class Expense {
    id?:number;
    restaurant_id?:number;
    restaurant?:Restaurant;
    hotel_id?:number;
    hotel?:Hotel;
    amount_hotel:number;;
    amount_restaurant:number;
    date_service_hotel:string;
    date_service_restaurant:string;
}
