import { generateBasicToken } from '../utils/auth';

const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

export const token = generateBasicToken(USER_ID, USER_PASSWORD);
