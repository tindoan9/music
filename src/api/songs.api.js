import { API, URL_API } from "./const.api";

export const SongsAPI = {
    postSong: (data) => API.post(`${URL_API}/songs`, data),
    getSong: () => API.get(`${URL_API}/songs`),
    deleteSong: (id) => API.delete(`${URL_API}/songs`, id),
    editSong: (data, id) => API.patch(`${URL_API}/songs`, id, data),
    searchSong: (text) => API.get(`${URL_API}/songs?q=${text}`),
    likeSong: (data) => API.post(`${URL_API}/like`, data),
    dislikeSong: (id) => API.delete(`${URL_API}/like`, id),
    fetchListUserLikeSong: () => API.get(`${URL_API}/like`),
}