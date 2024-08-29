export const checkuserAccess = async (
  prisma: any,
  userId: any,
  postId: any
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return {
      userError: "User not found",
      post: null,
    };
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
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
};
