import { delay, put, takeEvery } from "redux-saga/effects";
import { AuthAPI, AvatarAPI } from "../../api";
import { fetchAvatarAction, fetchAvatarActionFailed, fetchAvatarActionSuccess, loginAction, loginActionFailed, loginActionSuccess, registerAction, registerActionFailed, registerActionSuccess } from "../slices/user.slice";

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

export function* userSaga() {
    yield takeEvery(registerAction, register);
    yield takeEvery(loginAction, login);
    yield takeEvery(fetchAvatarAction, fetAvatar);
}