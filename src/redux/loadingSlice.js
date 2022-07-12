import { createSlice } from "@reduxjs/toolkit";
const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        loading: false,
        count: 0,
    },
    reducers: {
        startLoading: (state, action) => {
            state.loading = true;
            state.count += 1;
        },
        stopLoading: (state, action) => {
            state.count -= 1;
            if (state.count == 0) state.loading = false;
        },
    },
});
const { reducer, actions } = loadingSlice;
export const { startLoading, stopLoading } = actions;
export default reducer;
