import { Quota } from "./quota.model"
import { Spent } from "./spent.model"

export class Bill {
    id?: number
    date_bill: Date
    total_amount: number
    state: string
    quota: number
    //payment_id: number
   // spent_id: number 
    quotas:Quota
    spents:Spent;
}
