import "reflect-metadata"
import { GetUsersUseCase } from "../../application/useCases/user/GetUsersUseCase";

describe('GetUsersUseCase', () => {
    it('deve retornar uma lista de usuários', async () => {
        // Arr
        const user1 = createUser();
        const user2 = createUser();

        const mockUsers = [user1, user2];
        
        const mockUserRepository = {
            createUser: jest.fn().mockResolvedValue(null),
            findByEmail: jest.fn().mockResolvedValue(null),
            getUsers: jest.fn().mockResolvedValue(mockUsers),
            findByUserId: jest.fn().mockResolvedValue(null)
        };

        const getUsersUseCase = new GetUsersUseCase(mockUserRepository);

        // Act

        const users = await getUsersUseCase.invoke();

        // Assert

        expect(users).toEqual(mockUsers);
    });
});

function createUser() {
    var num: number = Math.random();
    return {
        id: num.toString(),
        name: 'nome_qualquer',
        email: `teste${num}@gmail.com`,
        password: 'any_password'
    };
}

