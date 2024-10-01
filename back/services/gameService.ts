import { User } from '../models/User';
import { getUsers, } from '../dal/userDAL.js';

export const getUser = async (username: string): Promise<User | null> => {
    const users = await getUsers();
    const user = users.find(u => u.username === username);
    if (user) {
        return user;
    }
    return null;
}

