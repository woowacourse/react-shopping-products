import { generateBasicToken } from '@/utils/auth';

const USER_ID = process.env.VITE_API_USER_ID || 'id';
const USER_PASSWORD = process.env.VITE_API_USER_PASSWORD || 'password';

const token = generateBasicToken(USER_ID, USER_PASSWORD);

export default token;
