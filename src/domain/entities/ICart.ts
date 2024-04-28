export interface ICart {
    id?: string;
    userId: string;
    cartItems?: Array<{ product: string; quantity: number }>;
}