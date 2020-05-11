'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const users_1 = require('../controllers/users');
exports.initUserApi = (app, data) => {
  const userController = new users_1.UserController(data);
  app.get(`/users`, userController.listUsers);
  app.get(`/users/:id`, userController.getUser);
};
//# sourceMappingURL=users.js.map
