import axios from 'axios';

export const apiInstance = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
        'Content-Type': 'application/json',
    },
});