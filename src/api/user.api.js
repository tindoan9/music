import { API, URL_API } from "./const.api";

export const UserAPI = {
    updateInfoUser: (data, id) => API.patch(`${URL_API}/users`, id, data)
}