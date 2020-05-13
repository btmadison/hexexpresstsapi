import * as express from 'express';

import UserController from '../controllers/users';
import UserRepository from '../models/user/user-repository';

export default class UserApi {
  userController: UserController;

  constructor(private app: express.Application, private data: UserRepository) {
    this.initUserApi();
  }

  initUserApi = () => {
    this.userController = new UserController(this.data);
    this.app.get(`/users`, this.userController.listUsers);
    this.app.get(`/users/:id`, this.userController.getUser);
  };
}
