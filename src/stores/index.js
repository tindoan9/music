import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { mySaga } from "./sagas";
import { songReducer } from "./slices/song.slice.admin";
import { userReducer } from "./slices/user.slice";

const sagaMiddleware = createSagaMiddleware()
const middleware = [ sagaMiddleware ]

const rootReducer = {
    user: userReducer,
    song: songReducer
}

export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), ...middleware]
})

sagaMiddleware.run(mySaga)
