import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { authService } from "../services/authService";
import { localStorageService } from "../services/localService";

let initialState = {};
const setupInitialState = () => {
    let adminLogin = localStorageService.getAdminLocal();
    let isLoggedIn = false;
    if (adminLogin) {
        isLoggedIn = true;
    }
    initialState = {
        adminLogin: adminLogin?.user,
        isLoggedIn: isLoggedIn,
        accessToken: adminLogin?.accessToken,
    };
};
setupInitialState();

export const postDataDangNhap = createAsyncThunk(
    "authSlice/fetchDataDangNhap",
    async (dataDangNhap, thunkAPI) => {
        try {
            const result = await authService.dangNhap(dataDangNhap);
            const user = result.data.user;
            if (user.type !== "ADMIN") {
                message.error("Vui lòng đăng nhập ADMIN account");
                throw "Vui lòng đăng nhập ADMIN account";
            }
            message.success(result.data.message);
            localStorageService.setAdminLocal({
                accessToken: result.data.token,
                user: result.data.user,
            });
            return {
                accessToken: result.data.token,
                user: result.data.user,
            };
        } catch (error) {
            message.error(error.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        dangXuat: (state) => {
            state.accessToken = null;
            state.adminLogin = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: {
        [postDataDangNhap.fulfilled]: (state, { payload }) => {
            let { accessToken, ...user } = payload;
            state.isLoggedIn = true;
            state.adminLogin = user.user;
            state.accessToken = accessToken;
        },
        [postDataDangNhap.rejected]: (state) => {
            state.isLoggedIn = false;
        },
        [postDataDangNhap.pending]: (state) => {
            state.isLoggedIn = false;
        },
    },
});

export const dangXuat = createAction("authSlice/dangXuat", () => {
    authService.dangXuat();
    return {
        payload: {},
    };
});

export default authSlice.reducer;
