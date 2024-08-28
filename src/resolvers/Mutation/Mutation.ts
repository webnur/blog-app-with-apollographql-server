import bcrypt from "bcrypt";

import { jwtHealper } from "../../utils/jwtHelper";
import { authResolvers } from "./auth";
import { postResolvers } from "./post";
// const prisma = new PrismaClient();
interface UserInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const Mutation = {
  ...authResolvers,
  ...postResolvers,
};
