import User from '../models/user/user';
import UserRepository from '../models/user/user-repository';

export default class UsersService {
  private userStore: UserRepository;

  constructor(userStore: UserRepository) {
    if (!this.userStore) {
      this.userStore = userStore;
    }
  }

  async getAll(): Promise<User[]> {
    return this.userStore.getAll();
  }

  async get(userId: string): Promise<User> {
    return this.userStore.get(userId);
  }
}
