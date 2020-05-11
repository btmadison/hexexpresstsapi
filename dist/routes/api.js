'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const users_1 = require('./users');
const user_inmem_repository_1 = require('../data/user-inmem-repository');
exports.registerRoutes = (app) => {
  users_1.initUserApi(app, new user_inmem_repository_1.UserInMemoryData());
};
//# sourceMappingURL=api.js.map
