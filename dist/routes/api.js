"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const user_inmem_repository_1 = __importDefault(require("../data/user-inmem-repository"));
const user_remote_repository_1 = __importDefault(require("../data/user-remote-repository"));
class ApiRouter {
    constructor(app) {
        this.app = app;
        this.localMode = true;
        const userDb = this.localMode ? new user_inmem_repository_1.default() : new user_remote_repository_1.default();
        const userApi = new users_1.default(this.app, userDb);
        userApi.initRoutes();
    }
}
exports.default = ApiRouter;
//# sourceMappingURL=api.js.map