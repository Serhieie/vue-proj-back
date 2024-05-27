import bcrypt from 'bcryptjs';

export const createHash = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const compareHash = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};
