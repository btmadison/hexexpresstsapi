"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../controllers/users"));
class UserApi {
    constructor(app, data) {
        this.app = app;
        this.data = data;
        this.initRoutes = () => {
            this.app.get(`/users`, this.userController.listUsers);
            this.app.get(`/users/:id`, this.userController.getUser);
        };
        this.userController = new users_1.default(this.data);
    }
}
exports.default = UserApi;
//# sourceMappingURL=users.js.map