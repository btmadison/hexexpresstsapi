import { Request, Response } from 'express';

import UserInMemoryData from '../data/user-inmem-repository';
import UserRepository from '../models/user/user-repository';
import UsersService from '../services/users';

export default class UserController {
  private userSvc: UsersService;

  constructor(userRepo: UserRepository = new UserInMemoryData()) {
    if (!this.userSvc) {
      this.userSvc = new UsersService(userRepo);
    }
  }

  listUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userSvc.getAll();
      res.json(users);
    } catch (err) {
      res.json({ error: err.message || err });
    }
  };

  getUser = async (req: any, res: any) => {
    try {
      const userId = req.params.id;
      const users = await this.userSvc.get(userId);
      res.json(users);
    } catch (err) {
      res.json({ error: err.message || err });
    }
  };
}
