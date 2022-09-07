import { createSlice } from "@reduxjs/toolkit"
import { notification } from "antd";

const initialState = {
    songState: {
        data: [],
        postSong: [],
        playSong: [],
        deleteSong: [],
        searchSong: '',
        loading: false,
        error: null
    }
}

const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        postSongAction: (state, action) => {
            state.songState = {
                ...state.songState,
                loading: true
            }
        },
        postSongActionSuccess: (state, action) => {
            notification.success({
                message: `Đăng bài hát thành công!`,
                duration: 2
            });
            const uploadSong = action.payload
            state.songState = {
                ...state.songState,
                postSong: uploadSong,
                loading: false,
                error: null
            }
        },
        postSongActionFailed: (state, action) => {
            state.songState = {
                ...state.songState,
                loading: false,
                error: action.payload
            }
        },
        fetchSongAction: (state, action) => {
            state.songState = {
                ...state.songState,
                loading: true
            }
        },
        fetchSongActionSuccess: (state, action) => {
            const {data} = action.payload
            state.songState = {
                ...state.songState,
                data,
                loading: false
            }
        },
        fetchSongActionfailed: (state, action) => {
            notification.error(action.payload)
        },
        deleteSongAction: (state, action) => {
            state.songState = {
                ...state.songState,
                loading:true,
            }
        },
        deleteSongActionSuccess: (state, action) => {
            notification.success({
                message: `Xóa bài hát thành công!`,
                duration: 2
            });
            const newData = state.songState.data.filter(item => item !== action.payload)
            state.songState = {
              ...state.songState,
              deleteSong: newData,
              loading:false,
            }
        },
        deleteSongActionFailed: (state,action) => {
            notification.error(action.payload)
        },
        editSongAction: (state, action) => {
            state.songState = {
                ...state.songState,
                loading: true
            }
        },
        editSongActionSuccess: (state, action) => {
            notification.success({
                message: `Chỉnh sửa bài hát thành công!`,
                duration: 2
            });
            const editSongDone = action.payload
            state.songState = {
                ...state.songState,
                data: editSongDone,
                loading: true
            }
        },
        editSongActionFailed: (state, action) => {
            notification.error({
                message: `Chỉnh sửa thất bại!`,
                duration: 2
            });
        },
        playSongAction: (state, action) => {
            const listSong = state.songState.data
            const selectSong = action.payload
            const song = listSong.find(song => song.id === selectSong)
            state.songState = {
                ...state.songState,
                playSong: song
            }
        }
    }
})

export const {postSongAction, postSongActionSuccess, postSongActionFailed, fetchSongAction, fetchSongActionfailed, fetchSongActionSuccess, deleteSongAction, deleteSongActionSuccess, deleteSongActionFailed, editSongAction, editSongActionSuccess, editSongActionFailed, playSongAction} = songSlice.actions

export const songReducer = songSlice.reducer 