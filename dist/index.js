"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
dotenv_1.default.config();
const baseUrl = process.env.BASE_URL;
const port = process.env.SERVER_PORT;
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
new api_1.default(app);
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at ${baseUrl}:${port}`);
});
//# sourceMappingURL=index.js.map