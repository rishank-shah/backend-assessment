import axios from 'axios'
import config from "../config";

export const register = async ({
    email,
    password,
}) =>
    await axios.post(`${config.SERVER_API_URL}/register`, {
        email,
        password,
    });

export const login = async ({ 
    email, 
    password 
}) =>
    await axios.post(`${config.SERVER_API_URL}/login`, {
        email,
        password,
    });