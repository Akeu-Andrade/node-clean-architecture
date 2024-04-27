class Product {
    constructor(
      private id: string,
      private name: string,
      private description: string,
      private price: number
    ) {}
  
    getId(): string {
      return this.id;
    }
  
    getName(): string {
      return this.name;
    }
  
    getDescription(): string {
      return this.description;
    }
  
    getPrice(): number {
      return this.price;
    }
}