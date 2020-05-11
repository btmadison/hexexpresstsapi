import { User } from "./user";

export interface IUserRepository {
    add: (user: User) => Promise<User>;
    update: (user: User) => Promise<User>;
    get: (userId: string) => Promise<User>;
    getAll: () => Promise<User[]>;
    delete: (userId: string) => Promise<'OK'>;
}