import { all, fork } from 'redux-saga/effects';
import { userSaga } from './user.saga';

export function* mySaga() {
    yield all([
        fork(userSaga) 
    ])
}