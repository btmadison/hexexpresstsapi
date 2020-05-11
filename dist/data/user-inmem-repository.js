"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserInMemoryData {
    constructor() {
        this.inmemDBIdPrefix = 'DB_';
        this.getAll = () => {
            return new Promise((resolve) => {
                resolve(this.users.map(this.removeDBPrefix));
            });
        };
        this.get = (id) => {
            return new Promise((resolve, reject) => {
                const searchId = this.inmemDBIdPrefix + id;
                const user = this.users.find(u => u.id === searchId);
                if (user) {
                    resolve(this.removeDBPrefix(user));
                }
                reject("User Not Found");
            });
        };
        this.add = (newUser) => {
            return new Promise((resolve, reject) => {
                const dbUserToAdd = this.addDBPrefix(newUser);
                const existingUser = this.users.find(u => u.id === dbUserToAdd.id);
                if (!existingUser) {
                    this.users.concat(dbUserToAdd);
                    resolve(newUser);
                }
                reject('User Already Exists');
            });
        };
        this.update = (user) => {
            return new Promise((resolve, reject) => {
                const dbUserToUpdate = this.addDBPrefix(user);
                let foundUser = this.users.find(u => u.id === dbUserToUpdate.id);
                if (foundUser) {
                    foundUser = dbUserToUpdate;
                    resolve(user);
                }
                reject("User Not Found");
            });
        };
        this.delete = (userId) => {
            return new Promise((resolve) => {
                this.users = this.users.filter(user => user.id !== this.inmemDBIdPrefix + userId);
                resolve('OK');
            });
        };
        this.removeDBPrefix = (user) => {
            const result = Object.assign({}, user);
            result.id = result.id.startsWith(this.inmemDBIdPrefix) ? result.id.substr(3) : user.id;
            return result;
        };
        this.addDBPrefix = (user) => {
            const result = Object.assign({}, user);
            result.id = result.id.startsWith(this.inmemDBIdPrefix) ? user.id : this.inmemDBIdPrefix + user.id;
            return result;
        };
        if (!this.users) {
            this.users = [
                {
                    id: 'DB_user-1',
                    name: 'Bob Jones',
                    favoriteFood: 'lettuce',
                    capabilities: ['canFoo', 'canBar'],
                    active: true
                }, {
                    id: 'DB_user-2',
                    name: 'Wendy Williams',
                    favoriteFood: 'fried fish',
                    capabilities: ['canFoo'],
                    active: true
                },
            ];
        }
    }
}
exports.UserInMemoryData = UserInMemoryData;
//# sourceMappingURL=user-inmem-repository.js.map