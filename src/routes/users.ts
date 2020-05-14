import * as express from 'express';

import UserController from '../controllers/users';
import UserRepository from '../models/user/user-repository';

export default class UserApi {
  userController: UserController;

  constructor(private app: express.Application, private data: UserRepository) {
    this.userController = new UserController(this.data);
  }

  initRoutes = () => {
    this.app.get(`/users`, this.userController.listUsers);
    this.app.get(`/users/:id`, this.userController.getUser);
  };
}
