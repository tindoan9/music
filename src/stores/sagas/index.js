import { all, fork } from 'redux-saga/effects';
import { songSaga } from './song.saga.admin';
import { userSaga } from './user.saga';

export function* mySaga() {
    yield all([
        fork(userSaga),
        fork(songSaga)
    ])
}