import { delay, put, takeEvery } from "redux-saga/effects";
import { AuthAPI, AvatarAPI, SongsAPI, UserAPI } from "../../api";
import { countDislikeAction, countDislikeActionFailed, countDislikeActionSuccess, countLikeAction, countLikeActionFailed, countLikeActionSuccess, dislikeSongAction, dislikeSongActionFailed, dislikeSongActionSuccess, fetchAvatarAction, fetchAvatarActionFailed, fetchAvatarActionSuccess, fetchListUserLikeSongAction, fetchListUserLikeSongActionFailse, fetchListUserLikeSongActionSuccess, fetchSortLikeSongDescAction, fetchSortLikeSongDescActionFailse, fetchSortLikeSongDescActionSuccess, likeSongAction, likeSongActionFailed, likeSongActionSuccess, loginAction, loginActionFailed, loginActionSuccess, registerAction, registerActionFailed, registerActionSuccess, searchSongAction, searchSongActionFailed, searchSongActionSuccess, updateInfoUserAction, updateInfoUserActionFailed, updateInfoUserActionSuccess } from "../slices/user.slice";

function* login(action) {
    try {
        yield delay(1000)
        const loginPayload = action.payload
        const response = yield AuthAPI.login({
            email: loginPayload.email,
            password: loginPayload.password,
        });
        yield put(loginActionSuccess(response.data.user));
    } catch (e) {
        yield put(loginActionFailed(e.response.data));
    }
}

function* register(action) {
    try {
        const registerPayload = action.payload
        const response = yield AuthAPI.register({
            avatar: registerPayload.randomAvatar.image,
            fullName: registerPayload.values.fullname,
            email: registerPayload.values.email,
            password: registerPayload.values.password,
            decentralization: registerPayload.decentralization
        });
        yield put(registerActionSuccess(response.data.user));
    } catch (e) {
        yield put(registerActionFailed(e.response.data));
    }
}

function* fetAvatar(action){
    try {
        const response = yield AvatarAPI.getAvatar()
        const avatartData = response.data
        yield put(fetchAvatarActionSuccess({
            avatar: avatartData
        }))
    } catch (e) {
        yield put(fetchAvatarActionFailed(e.response.data))
    }
}

function* updateInfoUser(action) {
    try {
        yield delay(2000)
        const infoUserPayload = action.payload
        const response = yield UserAPI.updateInfoUser({
            id: infoUserPayload.userId,
            email: infoUserPayload.userEmail,
            avatar: infoUserPayload.urlImage,
            fullName: infoUserPayload.editNameInput,
            decentralization: infoUserPayload.decentralization
        }, infoUserPayload.userId)
        yield put(updateInfoUserActionSuccess(response.data))
    } catch (e) {
        yield put(updateInfoUserActionFailed(e.response.data))
    }
}

function* likeSong(action) {
    try {
        const infoUserLikeSong = action.payload
        const response = yield SongsAPI.likeSong({
            userId: infoUserLikeSong.idUser,
            email: infoUserLikeSong.email,
            songId: infoUserLikeSong.idSong,
            songName: infoUserLikeSong.songName,
            songAuthor: infoUserLikeSong.songAuthor,
            urlSong: infoUserLikeSong.urlSong,
            imgSong: infoUserLikeSong.imgSong
        })
        yield put(likeSongActionSuccess(response.data))
    } catch (e) {
        yield put(likeSongActionFailed(e.response.data))
    }
}

function* countLike(action) {
    try {
        const countLike = action.payload
        const newLike = countLike.countLike + 1
        const songId = countLike.idSong
        const response = yield SongsAPI.editSong({
            like: newLike
        }, songId)
        yield put(countLikeActionSuccess(response.data))
    } catch (e) {
        yield put(countLikeActionFailed(e.response.data))
    }
}

function* countDislike(action) {
    try {
        const countDislikeSong = action.payload
        const dislike = countDislikeSong.like - 1
        const response = yield SongsAPI.editSong({
            like: dislike
        }, countDislikeSong.idSong)
        yield put(countDislikeActionSuccess(response.data))
    } catch (e) {
        yield put(countDislikeActionFailed(e.response.data))
    }
}

function* dislikeSong(action) {
    try {
        const infoUserDislikeSong = action.payload
        yield SongsAPI.dislikeSong(infoUserDislikeSong.id)
        yield put(dislikeSongActionSuccess(infoUserDislikeSong))
    } catch (e) {
        yield put(dislikeSongActionFailed(e.response))
    }
}

function* fetchListUserLikeSong(action) {
    try {
        const response = yield SongsAPI.fetchListUserLikeSong()
        const listUserLikeSong = response.data
        yield put(fetchListUserLikeSongActionSuccess({
            listUserLikeSong
        }))
    } catch (e) {
        yield put(fetchListUserLikeSongActionFailse(e.response.data))
    }
}

function* fetchSortLikeSongDesc(action) {
    try {
        const response = yield SongsAPI.fetchSortLikeSongDesc()
        const listSortLikeSong = response.data
        yield put(fetchSortLikeSongDescActionSuccess({
            listSortLikeSong
        }))
    } catch (e) {
        yield put(fetchSortLikeSongDescActionFailse(e.response.data))
    }
}

function* searchSong(action) {
    try {
        const response = yield SongsAPI.searchSong(action.payload)
        yield put(searchSongActionSuccess({
            search: response.data
        }))
    } catch (e) {
        yield put(searchSongActionFailed(e.response))
    }
}

export function* userSaga() {
    yield takeEvery(registerAction, register);
    yield takeEvery(loginAction, login);
    yield takeEvery(fetchAvatarAction, fetAvatar);
    yield takeEvery(updateInfoUserAction, updateInfoUser);
    yield takeEvery(likeSongAction, likeSong);
    yield takeEvery(dislikeSongAction, dislikeSong);
    yield takeEvery(countLikeAction, countLike);
    yield takeEvery(searchSongAction, searchSong);
    yield takeEvery(fetchListUserLikeSongAction, fetchListUserLikeSong);
    yield takeEvery(fetchSortLikeSongDescAction, fetchSortLikeSongDesc);
    yield takeEvery(countDislikeAction, countDislike);
}