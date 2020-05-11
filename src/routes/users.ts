import * as express from 'express';
import { UserController } from '../controllers/users';
import { UserRepository } from '../models/user/user-repository';

export const initUserApi = (app: express.Application, data: UserRepository) => {
  const userController = new UserController(data);
  app.get(`/users`, userController.listUsers);
  app.get(`/users/:id`, userController.getUser);
};
