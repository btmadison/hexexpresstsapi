import { UsersService } from "../services/users";
import { IUserRepository } from "../models/user/user-repository";
import { UserInMemoryData } from "../data/user-inmem-repository";
import { Response, Request } from 'express';

export class UserController {
  private userSvc: UsersService;

  constructor(userRepo: IUserRepository = new UserInMemoryData()) {
    if (!this.userSvc) {
      this.userSvc = new UsersService(userRepo);
    }
  }

  listUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userSvc.getAll();
      return res.json(users);
    } catch (err) {
      res.json({ error: err.message || err });
    }
  }

  getUser = async (req: any, res: any) => {
    try {
      const userId = req.params.id;
      const users = await this.userSvc.get(userId);
      return res.json(users);
    } catch (err) {
      res.json({ error: err.message || err });
    }
  }

}
