export class Cart {
    constructor(
      private id: string,
      private user: string,
      private products: Array<{ product: string; quantity: number }>
    ) {}
  
    getId(): string {
      return this.id;
    }
  
    getUser(): string {
      return this.user;
    }
  
    getProducts(): Array<{ product: string; quantity: number }> {
      return this.products;
    }
}