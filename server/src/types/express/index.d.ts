import { User } from "../../models/User.js";
import { Group } from "../../models/Group.ts";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
    group?: Group;
  }
}
