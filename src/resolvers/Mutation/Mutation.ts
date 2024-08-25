// import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { jwtHealper } from "../../utils/jwtHelper";
// const prisma = new PrismaClient();
interface UserInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const Mutation = {
  signup: async (parent: any, args: UserInfo, { prisma }: any) => {
    const isExist = await prisma.user.findFirst({
      where: { email: args.email },
    });

    if (isExist) {
      return {
        userError: "Email already exists",
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(args.password, 12);
    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
          // user: { connect: { id: newUser.id } },
        },
      });
    }

    // const token = jwt.sign({ userId: newUser.id }, "signature", {
    //   expiresIn: "1d",
    // });

    const token = await jwtHealper({ userId: newUser.id });

    return {
      userError: null,
      token,
    };
  },

  signin: async (parent: any, args: any, { prisma }: any) => {
    // console.log(args, parent, context);
    const user = await prisma.user.findFirst({
      where: { email: args.email },
    });

    if (!user) {
      return {
        userError: "User not found",
        token: null,
      };
    }

    const isMatch = await bcrypt.compare(args.password, user.password);

    if (!isMatch) {
      return {
        userError: "Password is incorrect",
        token: null,
      };
    }

    // const token = jwt.sign({ userId: user.id }, "signature", {
    //   expiresIn: "1d",
    // });
    const token = await jwtHealper({ userId: user.id });

    return {
      userError: null,
      token,
    };
  },
};
