import jwt from "jsonwebtoken";

export const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign({ user, activationCode }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  return { token, activationCode };
};
