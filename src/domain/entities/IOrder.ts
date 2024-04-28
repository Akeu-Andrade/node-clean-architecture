export interface IOrder {
  id? : string;
  userId : string;
  orderItems? : Array<{ productId: string; quantity: number }>;
  totalPrice : number;
  date : Date;
}