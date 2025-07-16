import cloudinary from "../config/cloudinary.js";
import { UserModel, User } from "../models/User.js";
import bcrypt from "bcryptjs";

type NewUser = Pick<User, "username" | "email" | "name" | "bio" | "university"> & {password: string};

export const signup = async(req: NewUser, res: unknown) => {
    try{
        const user = await UserModel.createUser(req);
    }catch(error){
        console.log(error);
    }
}