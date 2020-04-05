import axios from 'axios';

const client = axios.create({
    baseURL: 'https://collaborativeshopping.herokuapp.com/',
    responseType: 'json'
});

export default client;
