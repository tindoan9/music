import { API, URL_API } from "./const.api";

export const AvatarAPI = {
    getAvatar: () => API.get(`${URL_API}/avatar`)
}