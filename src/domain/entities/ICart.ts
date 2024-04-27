export interface ICart {
    id: string;
    user: string;
    products: Array<{ product: string; quantity: number }>;
}