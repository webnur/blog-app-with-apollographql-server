export const postResolvers = {
  addPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    if (!args.title || !args.content) {
      return {
        userError: "Title and content are required",
        post: null,
      };
    }

    const post = await prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: userInfo.userId,
      },
    });

    return {
      userError: null,
      post,
    };
  },
};
