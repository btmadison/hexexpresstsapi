"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_inmem_repository_1 = __importDefault(require("../data/user-inmem-repository"));
const users_1 = __importDefault(require("../services/users"));
class UserController {
    constructor(userRepo = new user_inmem_repository_1.default()) {
        this.listUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userSvc.getAll();
                res.json(users);
            }
            catch (err) {
                res.json({ error: err.message || err });
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const users = yield this.userSvc.get(userId);
                res.json(users);
            }
            catch (err) {
                res.json({ error: err.message || err });
            }
        });
        if (!this.userSvc) {
            this.userSvc = new users_1.default(userRepo);
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=users.js.map