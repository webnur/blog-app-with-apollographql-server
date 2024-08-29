import { checkuserAccess } from "../../utils/checkUserAccess";

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
  updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    // console.log("args:", args, "user info", userInfo);
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    // handle post and user error with extra function
    // const error = await checkuserAccess(prisma, userInfo.userId, args.postId);
    // if (error) {
    //   return error;
    // }

    const user = await prisma.user.findUnique({
      where: { id: userInfo.userId },
    });

    if (!user) {
      return {
        userError: "User not found",
        post: null,
      };
    }

    const post = await prisma.post.findUnique({
      where: { id: args.postId },
      include: {
        author: true,
      },
    });

    if (!post) {
      return {
        userError: "Post not found",
        post: null,
      };
    }

    if (post.authorId !== user.id) {
      return {
        userError: "post author not found",
        post: null,
      };
    }

    const updatePost = await prisma.post.update({
      where: { id: args.postId },
      data: {
        title: args.title || post.title,
        content: args.content || post.content,
      },
    });

    return {
      userError: null,
      post: updatePost,
    };
  },
  deletePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    // console.log("args:", args, "user info", userInfo);
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    // handle post and user error with extra function
    const error = await checkuserAccess(prisma, userInfo.userId, args.postId);
    if (error) {
      return error;
    }

    const deletePost = await prisma.post.delete({
      where: { id: args.postId },
      include: {
        author: true,
      },
    });

    return {
      userError: null,
      post: deletePost,
    };
  },
};
