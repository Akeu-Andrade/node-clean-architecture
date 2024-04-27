export interface IOrder {
  id : string;
  user : string;
  products : Array<{ product: string; quantity: number }>;
  totalPrice : number;
  date : Date;
}