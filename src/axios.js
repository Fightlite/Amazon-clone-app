import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-app-2021-6189e.cloudfunctions.net/api'
});

export default instance;

//http://localhost:5001/app-2021-6189e/us-central1/api