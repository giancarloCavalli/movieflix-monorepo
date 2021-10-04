import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import { getAuthData } from './storage';

export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';
export const LOGIN_URL = '/oauth/token'

type LoginData = {
  username: string,
  password: string
}

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'myclientid';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'myclientsecret';

const basicHeader = () => `Basic ${window.btoa(CLIENT_ID+':'+CLIENT_SECRET)}`;

export const requestBackend = (config: AxiosRequestConfig) => {

  const headers = config.withCredentials ? {
    ...config.headers,
    Authorization: `Bearer ${getAuthData().access_token}`
  } : config.headers;

  return axios({...config, baseURL: BASE_URL, headers});
};

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: basicHeader()
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password'
  });

  return axios({method: 'POST', baseURL: BASE_URL, url: LOGIN_URL, data, headers});
}

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401 || error.response.status === 403)
    history.push('/');

  return Promise.reject(error);
});