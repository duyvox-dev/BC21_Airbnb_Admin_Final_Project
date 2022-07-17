import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { locationService } from "../services/locationService";
import { message } from "antd";
export const createLocation = createAsyncThunk(
    "locationSlice/createLocation",
    async (locationInfo, thunkAPI) => {
        try {
            const result = await locationService.createLocation(locationInfo);
            thunkAPI.dispatch(toggleAddLocationModal());
            thunkAPI.dispatch(getLocationList());

            message.success(result.data.message);
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
export const getLocationInfo = createAsyncThunk(
    "locationSlice/getLocationList",
    async (locationId, thunkAPI) => {
        try {
            const result = await locationService.getLocationInfo(locationId);
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);
export const deleteLocation = createAsyncThunk(
    "locationSlice/deleteLocation",
    async (locationID, thunkAPI) => {
        try {
            const result = await locationService.deleteLocation(locationID);
            thunkAPI.dispatch(getLocationList());
            message.success("Xoá vị trí thành công!");
            return result.data;
        } catch (error) {
            message.error(error.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);
export const updateLocation = createAsyncThunk(
    "locationSlice/updateLocation",
    async ({ locationID, locationData }, thunkAPI) => {
        try {
            const result = await locationService.updateLocationInfo(
                locationID,
                locationData
            );

            thunkAPI.dispatch(toggleEditLocationModal());
            thunkAPI.dispatch(getLocationList());
            // return result.data;
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
        currentLocation: {},
        modalEdit: false,
        modalAdd: false,
    },
    reducers: {
        toggleEditLocationModal: (state, action) => {
            state.modalEdit = !state.modalEdit;
        },
        toggleAddLocationModal: (state, action) => {
            state.modalAdd = !state.modalAdd;
        },
    },
    extraReducers: {
        [getLocationList.pending]: (state, action) => {
            state.locationList = [];
        },
        [getLocationList.fulfilled]: (state, action) => {
            state.locationList = action.payload;
        },
        [getLocationList.rejected]: (state, action) => {},
        [getLocationInfo.pending]: (state, action) => {
            state.currentLocation = [];
        },
        [getLocationInfo.fulfilled]: (state, action) => {
            state.currentLocation = action.payload;
        },
        [getLocationInfo.rejected]: (state, action) => {},
    },
});
const { reducer, actions } = locationSlice;
export const { toggleEditLocationModal, toggleAddLocationModal } = actions;
export default reducer;
