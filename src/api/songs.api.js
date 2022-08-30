import { API, URL_API } from "./const.api";

export const SongsAPI = {
    postSong: (data) => API.post(`${URL_API}/songs`, data),
    getSong: () => API.get(`${URL_API}/songs`),
    deleteSong: (id) => API.delete(`${URL_API}/songs`, id),
    editSong: (data, id) => API.patch(`${URL_API}/songs`, id, data)
}