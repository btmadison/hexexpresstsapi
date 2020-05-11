import { UsersService } from './users';
import { UserInMemoryData } from '../data/user-inmem-repository';
import { IUserRepository } from '../models/user/user-repository';

jest.mock('../data/user-inmem-repository');

describe('Users', () => {
  let instance: UsersService;
  let db: IUserRepository;

  beforeEach(() => {
    db = new UserInMemoryData();
    instance = new UsersService(db);
  });

  it('should get all users as an array with DB_ stripped off id', async () => {
    expect(instance).toBeInstanceOf(UsersService);
    const allUsers = await instance.getAll();
    expect(allUsers).toBeDefined();
    expect(allUsers[0].id).toBe('MOCK_user-1');
  });
});
