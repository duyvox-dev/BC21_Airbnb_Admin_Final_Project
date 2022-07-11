import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import locationSlice from "./locationSlice";
export const store = configureStore({
    reducer: {
        authSlice,
        userSlice,
        locationSlice,
    },
});
