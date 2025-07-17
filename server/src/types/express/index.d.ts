import { User } from "../../models/User.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
