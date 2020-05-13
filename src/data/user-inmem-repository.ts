import User from '../models/user/user';
import UserRepository from '../models/user/user-repository';

export default class UserInMemoryData implements UserRepository {
  private users: User[];

  private inmemDBIdPrefix = 'DB_';

  constructor() {
    if (!this.users) {
      this.users = [
        {
          id: 'DB_user-1',
          name: 'Bob Jones',
          favoriteFood: 'lettuce',
          capabilities: ['canFoo', 'canBar'],
          active: true,
        },
        {
          id: 'DB_user-2',
          name: 'Wendy Williams',
          favoriteFood: 'fried fish',
          capabilities: ['canFoo'],
          active: true,
        },
      ];
    }
  }

  getAll = () => {
    return new Promise<User[]>((resolve) => {
      resolve(this.users.map(this.removeDBPrefix));
    });
  };

  get = (id: string) => {
    return new Promise<User>((resolve, reject) => {
      const searchId = this.inmemDBIdPrefix + id;
      const user = this.users.find((u) => u.id === searchId);
      if (user) {
        resolve(this.removeDBPrefix(user));
      }
      reject(Error('User Not Found'));
    });
  };

  add = (newUser: User) => {
    return new Promise<User>((resolve, reject) => {
      const dbUserToAdd = this.addDBPrefix(newUser);
      const existingUser = this.users.find((u) => u.id === dbUserToAdd.id);
      if (!existingUser) {
        this.users.concat(dbUserToAdd);
        resolve(newUser);
      }
      reject(Error('User Already Exists'));
    });
  };

  update = (user: User) => {
    return new Promise<User>((resolve, reject) => {
      const dbUserToUpdate = this.addDBPrefix(user);
      let foundUser = this.users.find((u) => u.id === dbUserToUpdate.id);
      if (foundUser) {
        foundUser = dbUserToUpdate;
        resolve(user);
      }
      reject(Error('User Not Found'));
    });
  };

  delete = (userId: string) => {
    return new Promise<'OK'>((resolve) => {
      this.users = this.users.filter((user) => user.id !== this.inmemDBIdPrefix + userId);
      resolve('OK');
    });
  };

  private removeDBPrefix = (user: User) => {
    const result = { ...user };
    result.id = result.id.startsWith(this.inmemDBIdPrefix) ? result.id.substr(3) : user.id;
    return result;
  };

  private addDBPrefix = (user: User) => {
    const result = { ...user };
    result.id = result.id.startsWith(this.inmemDBIdPrefix) ? user.id : this.inmemDBIdPrefix + user.id;
    return result;
  };
}
