import { Plan } from './plan';
export interface Deposit {
    userId: {
        _id: string
        username: string 
        email: string
      }
    amount : string
    txReference : string
    paymentProofUrl: string
    status : string
    _id : string
    createdAt : string
    plan : Plan
}
