import jwt from "jsonwebtoken";

export const generateToken = async (payload: { userId: string }) => {
  const token = jwt.sign(payload, process.env.JWT_SIGNATURE as string, {
    expiresIn: "10d",
  });
  return token;
};

const getUserInfoFromToken = async (token: string) => {
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SIGNATURE as string
    ) as { userId: string };
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const jwtHealper = {
  generateToken,
  getUserInfoFromToken,
};
