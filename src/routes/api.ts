import * as express from 'express';

import UserApi from './users';
import UserInMemoryData from '../data/user-inmem-repository';
import UsersRemoteRepository from '../data/user-remote-repository';

export default class ApiRouter {
  localMode = process.env.LOCAL_DB;

  constructor(private app: express.Application) {
    const userDb = this.localMode ? new UserInMemoryData() : new UsersRemoteRepository();
    const userApi = new UserApi(this.app, userDb);
    userApi.initRoutes();
  }
}
