import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const USER_INFO_KEY = 'USER_INFO_MUSIC';

const userInfoFromStorage = localStorage.getItem(USER_INFO_KEY) ? JSON.parse(localStorage.getItem(USER_INFO_KEY)) : null;

const initialState = {
    userInfoState: {
        data: userInfoFromStorage,
        createAccount: [],
        avatar: [],
        likeSong: [],
        dislikeSong: [],
        countLike: [],
        countDislike: [],
        searchSong: [],
        listUserLikeSong: [],
        listSortLikeSong: [], 
        loading: false,
        error: null
    }
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginAction(state, action) {
            localStorage.removeItem(USER_INFO_KEY)
            state.userInfoState = {
                ...state.userInfoState,
                loading: true
            }
        },
        loginActionSuccess(state, action) {
            notification.success({
                message: `Đăng nhập thành công!`,
                duration: 2
            });
            const userInfoResponse = action.payload
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfoResponse))
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                data: userInfoResponse
            }
        },
        loginActionFailed(state, action) {
            notification.error({
                message: `Email hoặc mật khẩu không chính xác!`,
                duration: 2
            });
            localStorage.removeItem(USER_INFO_KEY)
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                error: action.payload.error
            }
        },
        registerAction(state, action) {
            state.userInfoState = {
                ...state.userInfoState,
                loading: true,
            }
        },
        registerActionSuccess(state, action) {
            notification.success({
                message: `Đăng ký thành công!`,
                duration: 2
            });
            const userInfoResponse = action.payload;
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                createAccount: userInfoResponse,
                error: null
            }
        },
        registerActionFailed(state, action) {
            notification.error({
                message: `Email đã tồn tại`,
                duration: 2
            });
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                error: action.payload
            }
        },
        logoutAction(state, action) {
            notification.success({
                message: `Đăng xuất thành công!`,
                duration: 2
            });
            localStorage.removeItem(USER_INFO_KEY);
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                data: null
            }
        },
        fetchAvatarAction: (state, action) => {
            state.userInfoState = {
                ...state.userInfoState,
                loading: true,
            }
		},
        fetchAvatarActionSuccess: (state, action) => {
            const {avatar} = action.payload
            state.userInfoState = {
                ...state.userInfoState,
                avatar,
                loading: false,
            }
        },
        fetchAvatarActionFailed: (state, action) => {
            notification.error(action.payload)
        },
        updateInfoUserAction: (state, action) => {
            localStorage.removeItem(USER_INFO_KEY)
            state.userInfoState = {
                ...state.userInfoState,
                loading: true
            }
        },
        updateInfoUserActionSuccess: (state, action) => {
            notification.success({
                message: `Thay đổi thông tin thành công!`,
                duration: 2
            });
            const updateInfoUser = action.payload
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(updateInfoUser))
            state.userInfoState = {
                ...state.userInfoState,
                data: updateInfoUser,
                loading: false,
                error: null
            }
        },
        updateInfoUserActionFailed: (state, action) => {
            notification.error({
                message: `Thay đổi ảnh thất bại!`,
                duration: 2
            });
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                error: action.payload
            }
        },
        likeSongAction: (state, action) => {
            state.userInfoState = {
                ...state.userInfoState,
                loading: true
            }
        },
        likeSongActionSuccess: (state, action) => {
            notification.success({
                message: `Bạn đã yêu thích bài hát ${action.payload.songName}!`,
                duration: 3
            });
            const newUserLikeSong = action.payload
            state.userInfoState = {
                ...state.userInfoState,
                likeSong: newUserLikeSong,
                loading: false,
                error: null
            }
        },
        likeSongActionFailed: (state, action) => {
            notification.error({
                message: `${action.payload}`,
                duration: 2
            });
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                error: action.payload
            }
        },
        dislikeSongAction: (state, action) => {
            state.userInfoState = {
                ...state.userInfoState,
                loading: true
            }
        },
        dislikeSongActionSuccess: (state, action) => {
            const userDislikeSong = action.payload
            notification.success({
                message: `Bạn đã xóa lượt thích bài hát ${userDislikeSong.songName}!`,
                duration: 3
            });
            state.userInfoState = {
                ...state.userInfoState,
                dislikeSong: userDislikeSong,
                loading: false,
                error: null
            }
        },
        dislikeSongActionFailed: (state, action) => {
            notification.error({
                message: `${action.payload}`,
                duration: 2
            });
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                error: action.payload
            }
        },
        countLikeAction: (state, action) => {
            state.userInfoState = {
                ...state.userInfoState,
                loading: true
            }
        },
        countLikeActionSuccess: (state, action) => {
            const countLike = action.payload
            state.userInfoState = {
                ...state.userInfoState,
                countLike: countLike,
                loading: false
            }
        },
        countLikeActionFailed: (state, action) => {
            notification.error(action.payload)
        },
        countDislikeAction: (state, action) => {
            state.userInfoState = {
                ...state.userInfoState,
                loading: true
            }
        },
        countDislikeActionSuccess: (state, action) => {
            const countDislike = action.payload
            state.userInfoState = {
                ...state.userInfoState,
                countDislike: countDislike,
                loading: false
            }
        },
        countDislikeActionFailed: (state, action) => {
            notification.error(action.payload)
        },
        searchSongAction: (state, action) => {
            state.userInfoState = {
                ...state.userInfoState,
                loading: true
            }
        },
        searchSongActionSuccess: (state, action) => {
            const {search} = action.payload
            state.userInfoState = {
                ...state.userInfoState,
                searchSong: search,
                loading: false
            }
        },
        searchSongActionFailed: (state, action) => {
            notification.error(action.payload)
        },
        fetchListUserLikeSongAction: (state, action) => {
            state.userInfoState = {
                ...state.userInfoState,
                loading: true
            }
        },
        fetchListUserLikeSongActionSuccess: (state, action) => {
            const {listUserLikeSong} = action.payload
            state.userInfoState = {
                ...state.userInfoState,
                listUserLikeSong,
                loading: false
            }
        },
        fetchListUserLikeSongActionFailse: (state, action) => {
            notification.error(action.payload)
        },
        fetchSortLikeSongDescAction: (state, action) => {
            state.userInfoState = {
                ...state.userInfoState,
                loading: true
            }
        },
        fetchSortLikeSongDescActionSuccess: (state, action) => {
            const {listSortLikeSong} = action.payload
            state.userInfoState = {
                ...state.userInfoState,
                listSortLikeSong,
                loading: false
            }
        },
        fetchSortLikeSongDescActionFailse: (state, action) => {
            notification.error(action.payload)
        }
    }
})

export const {loginAction, loginActionSuccess, loginActionFailed, registerAction, registerActionSuccess, registerActionFailed, logoutAction, fetchAvatarAction, fetchAvatarActionSuccess, fetchAvatarActionFailed, updateInfoUserAction, updateInfoUserActionSuccess, updateInfoUserActionFailed, likeSongAction, likeSongActionSuccess, likeSongActionFailed, searchSongAction, searchSongActionSuccess, searchSongActionFailed, dislikeSongAction, dislikeSongActionSuccess, dislikeSongActionFailed, countLikeAction, countLikeActionSuccess, countLikeActionFailed, countDislikeAction, countDislikeActionSuccess, countDislikeActionFailed, fetchListUserLikeSongAction, fetchListUserLikeSongActionSuccess, fetchListUserLikeSongActionFailse, fetchSortLikeSongDescAction, fetchSortLikeSongDescActionSuccess, fetchSortLikeSongDescActionFailse} = userSlice.actions

export const userReducer = userSlice.reducer