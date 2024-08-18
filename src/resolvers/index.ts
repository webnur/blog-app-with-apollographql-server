import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserInfo {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  Query: {},

  Mutation: {
    signup: async (parent: any, args: UserInfo, context: any) => {
      return await prisma.user.create({
        data: args,
      });
    },
  },
};
