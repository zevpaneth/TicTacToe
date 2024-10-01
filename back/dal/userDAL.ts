import { User } from '../models/User.js';
import jsonfile from 'jsonfile';

const file = './users.json';

export const getUsers = async (): Promise<User[]> => {
  return jsonfile.readFile(file);
};

