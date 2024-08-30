// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// import prisma from  context area and call here

export const Query = {
  user: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.user.findUnique({
      where: {
        // id: userInfo.userId,
        id: args.userId,
      },
    });
  },
  profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: userInfo.userId,
      },
    });
  },
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
  posts: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [{ createdAt: "desc" }],
    });
  },
};
