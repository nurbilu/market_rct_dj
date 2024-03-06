import axios from 'axios';
const MY_SERVER = 'http://127.0.0.1:8000/register'; // Adjust the endpoint as necessary

export function register(userData) {
    return axios.post(MY_SERVER, {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword
    });
}

