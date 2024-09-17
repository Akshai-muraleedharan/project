import bcyrpt from "bcrypt";

export const hashPassword = (password) => {
  const salt = 10;
  const hashValue = bcyrpt.hashSync(password, salt);

  return hashValue;
};
