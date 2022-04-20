import { call, fork, put, take } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { authActions, LoginPayload } from "./authSlice";



function* handleLogin(payload: LoginPayload) {
    localStorage.setItem('access_token','fake')
    yield put(authActions.loginSuccess({
        id: 1,
        name: "Truong Tran",
    }))
 
}

function* handleLogout() {
    localStorage.removeItem('access_token')
}

function* watchLoginFlow() {
    while(true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'))
        if(!isLoggedIn) {
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type)
            yield fork(handleLogin,action.payload)
        }
        yield take(authActions.logout.type)
        yield call(handleLogout)
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow)
}