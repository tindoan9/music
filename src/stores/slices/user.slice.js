import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const USER_INFO_KEY = 'USER_INFO_MUSIC';

const userInfoFromStorage = localStorage.getItem(USER_INFO_KEY) ? JSON.parse(localStorage.getItem(USER_INFO_KEY)) : null;

const initialState = {
    userInfoState: {
        data: userInfoFromStorage,
        createAccount: [],
        avatar: [],
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
        }
    }
})

export const {loginAction, loginActionSuccess, loginActionFailed, registerAction, registerActionSuccess, registerActionFailed, logoutAction, fetchAvatarAction, fetchAvatarActionSuccess, fetchAvatarActionFailed} = userSlice.actions

export const userReducer = userSlice.reducer