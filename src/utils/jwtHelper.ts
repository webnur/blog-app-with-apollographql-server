import jwt from "jsonwebtoken";

export const jwtHealper = async (payload: { userId: string }) => {
  const token = jwt.sign(payload, process.env.JWT_SIGNATURE as string, {
    expiresIn: "1d",
  });
  return token;
};
