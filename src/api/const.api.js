import axios from "axios";

export const URL_API = 'https://fake-rest-api-music-app.herokuapp.com/api';

export const API = {
    get: (url) => axios.get(url),
    post: (url, data) => axios.post(url, data),
    patch: (url, id, data) => axios.patch(`${url}/${id}`, data),
    delete: (url, id) => axios.delete(`${url}/${id}`),
}