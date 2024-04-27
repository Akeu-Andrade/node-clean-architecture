//Todo ver se transformo em uma interface dps
class User {
    constructor(
      private id: string,
      private name: string,
      private email: string,
      private password: string
    ) {}
  
    getId(): string {
      return this.id;
    }
  
    getName(): string {
      return this.name;
    }
  
    getEmail(): string {
      return this.email;
    }

    getPassword(): string {
      return this.password;
    }
} 