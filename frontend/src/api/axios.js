import axios from 'axios';

//creating my own axios instance
export default axios.create({
    baseURL: 'http://localhost:3500'
});