import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from './loginAPI';
import { jwtDecode } from "jwt-decode";
const initialState = {
    status: 'idle',
    access: "",
    userName: "",
    admin: false,
    logged: false
};
export const loginAsync = createAsyncThunk(
    'login/login',
    async (credentials) => {
        console.log(credentials);
        const response = await login(credentials);
        return response.data;
    }
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        test: (state) => {
            console.log("testttttttttttttttttt");
        },
        logout: (state) => {
            state.access = ""
            state.userName = ""
            state.admin = false
            state.logged = false
        },
        incrementByAmount: (state, action) => {
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.access = action.payload.access
                state.userName = jwtDecode(action.payload.access).username
                state.admin = jwtDecode(action.payload.access).isSuper
                state.logged = true
                console.log(action.payload);
            });
    },
});

export const { test, logout, incrementByAmount } = loginSlice.actions;
export const selectstatus = (state) => state.login.status;
export const selectUsername = (state) => state.login.userName;
export const selectLogged = (state) => state.login.logged;
export const selectAdmin = (state) => state.login.admin;
export default loginSlice.reducer;