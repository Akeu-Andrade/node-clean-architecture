export interface ICart {
    id?: string;
    userId: string;
    cartItems?: Array<{ productId: string; quantity: number }>;
}