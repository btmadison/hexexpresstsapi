import User from './user';

export default interface UserRepository {
  add: (user: User) => Promise<User>;
  update: (user: User) => Promise<User>;
  get: (userId: string) => Promise<User>;
  getAll: () => Promise<User[]>;
  delete: (userId: string) => Promise<'OK'>;
}
