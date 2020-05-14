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
const axios_1 = __importDefault(require("axios"));
class UsersRemoteRepository {
    constructor(baseUrl = 'http://localhost:3000/') {
        this.baseUrl = baseUrl;
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const usersResponse = yield axios_1.default.get(`${this.baseUrl}users`);
            const capabilitiesResponse = yield axios_1.default.get(`${this.baseUrl}capabilities`);
            const users = UsersRemoteRepository.getUsersWithCapabilities(usersResponse.data, capabilitiesResponse.data);
            return users;
        });
        this.get = (id) => __awaiter(this, void 0, void 0, function* () {
            const userResponse = yield axios_1.default.get(`${this.baseUrl}users?id=${id}`);
            const capabilitiesResponse = yield axios_1.default.get(`${this.baseUrl}capabilities`);
            return UsersRemoteRepository.mergeUserWithCapabilities(userResponse.data, capabilitiesResponse.data);
        });
        this.add = (newUser) => __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post(`${this.baseUrl}users`, newUser);
            return response.data;
        });
        this.update = (user) => __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.put(`${this.baseUrl}users/${user.id}`, user);
            return response.data;
        });
        this.delete = (userId) => __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.delete(`${this.baseUrl}users/${userId}`);
            return 'OK';
        });
        console.log(`User API Set to ${baseUrl}`);
    }
    static getUsersWithCapabilities(users, userCapabilities) {
        return users.map((user) => UsersRemoteRepository.mergeUserWithCapabilities(user, userCapabilities));
    }
    static mergeUserWithCapabilities(user, userCapabilities) {
        const userResult = Object.assign({}, user);
        const matched = userCapabilities.find((c) => c.id === user.id);
        userResult.capabilities = matched.capabilities;
        return userResult;
    }
}
exports.default = UsersRemoteRepository;
//# sourceMappingURL=user-remote-repository.js.map