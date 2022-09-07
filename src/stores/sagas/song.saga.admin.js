import { deleteSongAction, deleteSongActionFailed, deleteSongActionSuccess, editSongAction, editSongActionFailed, editSongActionSuccess, fetchSongAction, fetchSongActionfailed, fetchSongActionSuccess, postSongAction, postSongActionFailed, postSongActionSuccess } from "../slices/song.slice.admin"
import { delay, put, takeEvery } from "redux-saga/effects";
import { SongsAPI } from "../../api";

function* postSong(action){
    try {
        yield delay(2000)
        const songPayload = action.payload
        const response = yield SongsAPI.postSong({
            songName: songPayload.songName,
            songAuthor: songPayload.songAuthor,
            urlSong: songPayload.urlSong,
            imgSong: songPayload.imgSong,
            like: songPayload.like,
        })
        yield put(postSongActionSuccess(response.data))
    } catch (e) {
        yield put(postSongActionFailed(e.response.data))
    }
}

function* fetchSongs(action) {
    try {
        const response = yield SongsAPI.getSong()
        const songData = response.data
        yield put(fetchSongActionSuccess({
            data: songData
        }))
    } catch (e) {
        yield put(fetchSongActionfailed(e.response.data))
    }
}

function* deleteSong(action) {
    try {
        const deleteSong = action.payload
        yield SongsAPI.deleteSong(deleteSong)
        yield put(deleteSongActionSuccess())
    } catch (e) {
        yield put(deleteSongActionFailed(e.response.data))
    }
}

function* editSong(action) {
    try {
        const newEditSong = action.payload
        const response = yield SongsAPI.editSong({
            songName: newEditSong.newEditSong.songName,
            songAuthor: newEditSong.newEditSong.songAuthor,
            urlSong: newEditSong.newEditSong.urlSong
        }, newEditSong.songID)
        yield put(editSongActionSuccess(response.data))
    } catch (e) {
        yield put(editSongActionFailed(e.response.data))
    }
}

export function* songSaga() {
    yield takeEvery(postSongAction, postSong);
    yield takeEvery(fetchSongAction, fetchSongs);
    yield takeEvery(deleteSongAction, deleteSong);
    yield takeEvery(editSongAction, editSong);
}