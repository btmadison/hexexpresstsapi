import * as express from "express";

import { initUserApi } from "./users";
import { UserInMemoryData } from "../data/user-inmem-repository";

export const registerRoutes = ( app: express.Application ) => {
    initUserApi(app, new UserInMemoryData());
}
