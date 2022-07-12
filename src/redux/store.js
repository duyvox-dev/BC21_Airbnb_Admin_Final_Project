import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import locationSlice from "./locationSlice";
import loadingSlice from "./loadingSlice";
export const store = configureStore({
    reducer: {
        authSlice,
        userSlice,
        locationSlice,
        loadingSlice,
    },
});
