import { User } from '../models/User';
import { getUsers, } from '../dal/userDAL.js';


export const authenticateUser = async (username: string, password: string): Promise<User | null> => {
  const users = await getUsers();
  const user = users.find(u => u.username === username && u.passwordHash === password);
  if (user  ) {
    return user;
  }
  return null;
};
