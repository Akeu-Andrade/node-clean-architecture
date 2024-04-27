class Buy {
    constructor(
      private id: string,
      private user: string,
      private products: Array<{ product: string; quantity: number }>,
      private totalPrice: number,
      private date: Date = new Date()
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
  
    getTotalPrice(): number {
      return this.totalPrice;
    }
  
    getDate(): Date {
      return this.date;
    }
}