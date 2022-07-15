import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { locationService } from "../services/locationService";
import { message } from "antd";
export const createLocation = createAsyncThunk(
    "locatiohSlice/createLocation",
    async (locationInfo, thunkAPI) => {
        try {
            const result = await locationService.createLocation(locationInfo);
            message.success(result.data.message);
            // console.log(result.data);
            return result.data;
        } catch (error) {
            // message.error(error.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const getLocationList = createAsyncThunk(
    "locatiohSlice/getLocationList",
    async (thunkAPI) => {
        try {
            const result = await locationService.getLocationList();
            // console.log(result.data);
            return result.data;
        } catch (error) {
            // message.error(error.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);
export const deleteLocation = createAsyncThunk(
    "locatiohSlice/deleteLocation",
    async (locationID, thunkAPI) => {
        try {
            const result = await locationService.deleteLocation(locationID);
            thunkAPI.dispatch(getLocationList());
            return result.data;
        } catch (error) {
            message.error(error.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);

const locationSlice = createSlice({
    name: "locatiohSlice",
    initialState: {
        locationList: [],
    },
    reducers: {},
    extraReducers: {
        [getLocationList.pending]: (state, action) => {
            state.locationList = [];
        },
        [getLocationList.fulfilled]: (state, action) => {
            state.locationList = action.payload;
        },
        [getLocationList.rejected]: (state, action) => { },
    },
});
const { reducer, actions } = locationSlice;
export default reducer;
