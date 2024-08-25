// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// import prisma from  context area and call here

export const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
};
