import axios from 'axios';

let axiosInstance = axios.create({
   baseURL: 'https://the-burger-builder-e8d2b.firebaseio.com/'
});

export default axiosInstance;