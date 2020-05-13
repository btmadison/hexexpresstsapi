import * as express from 'express';

import UserApi from './users';
import UserInMemoryData from '../data/user-inmem-repository';

export default class ApiRouter {
  constructor(private app: express.Application) {
    const userApi = new UserApi(this.app, new UserInMemoryData());
  }
}
