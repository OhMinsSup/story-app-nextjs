import axios from 'axios';
import { API } from '../config/contants';

const client = axios.create({
  baseURL: API.BASE_LOCAL_URL_V1,
  withCredentials: true,
});

export default client;
