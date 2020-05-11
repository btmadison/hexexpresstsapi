'use strict';
const __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
const users_1 = require('../services/users');
const user_inmem_repository_1 = require('../data/user-inmem-repository');
class UserController {
  constructor(userRepo = new user_inmem_repository_1.UserInMemoryData()) {
    this.listUsers = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        try {
          const users = yield this.userSvc.getAll();
          return res.json(users);
        } catch (err) {
          res.json({ error: err.message || err });
        }
      });
    this.getUser = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        try {
          const userId = req.params.id;
          const users = yield this.userSvc.get(userId);
          return res.json(users);
        } catch (err) {
          res.json({ error: err.message || err });
        }
      });
    if (!this.userSvc) {
      this.userSvc = new users_1.UsersService(userRepo);
    }
  }
}
exports.UserController = UserController;
//# sourceMappingURL=users.js.map
