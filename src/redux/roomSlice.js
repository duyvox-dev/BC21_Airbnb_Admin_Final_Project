import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { roomService } from "../services/roomService";
import _ from 'lodash';
import { locationService } from "../services/locationService";

export const getRoomList = createAsyncThunk(
    "roomSlice/getRoomList",
    async (idLocation, thunkAPI) => {
        try {
            const result = await roomService.getRoomList(idLocation);
            return result.data;
        } catch (error) {
            // message.error(error.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const deleteRoom = createAsyncThunk(
    "roomSlice/deleteRoom",
    async (idRoom, thunkAPI) => {
        try {
            const result = await roomService.deleteRoom(idRoom);
            message.success('Xoá phòng thành công!')

            return result.data;
        } catch (error) {
            // message.error(error.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const getRoomInfo = createAsyncThunk(//Get the room information by roomID after click edit button
    "roomSlice/getRoomInfo",
    async (idRoom, thunkAPI) => {
        try {
            const result = await roomService.getRoomInfo(idRoom);
            return result.data;
        } catch (error) {
            // message.error(error.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const editRoom = createAsyncThunk(
    "roomSlice/editRoom",
    async (data, thunkAPI) => {
        try {
            let { idRoom, formData } = data;
            const editRoomResult = await roomService.upadteRoomInfo(idRoom, formData);
            message.success('Cập nhật thông tin phòng thành công!');

            const searchLocationInfoResult = await locationService.getLocationInfo(editRoomResult.data.locationId); //Find location details according to locationID

            let refinedResult = {//Add location details to roomInfo object
                ...editRoomResult.data,
                locationId: searchLocationInfoResult.data,
            };
            return refinedResult;
        } catch (error) {
            // message.error(error.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);

const roomSlice = createSlice({
    name: "roomSlice",
    initialState: {
        roomList: [],
        filteredRoomList: [],
        roomInfo: {},
        isFormEditOpen: false,
        isFormAddNewRoomOpen: false,
    },
    reducers: {
        openFormEditRoomInfo: (state, action) => {
            state.isFormEditOpen = true;
        },
        closeFormEditRoomInfo: (state, action) => {
            state.isFormEditOpen = false;
        },

        openFormAddNewRoomInfo: (state, action) => {
            state.isFormAddNewRoomOpen = true;
        },
        closeFormAddNewRoomInfo: (state, action) => {
            state.isFormAddNewRoomOpen = false;
        },

        //Finding rooms according to location province name
        searchRoomListByLocationName: (state, action) => {
            let newRoomList = state.roomList.filter((room) => {
                if (typeof room.name === "string") {//Check valid search input value must be string
                    if (
                        room?.locationId?.province
                            ?.trim()
                            .toUpperCase()
                            .includes(_.trim(action.payload).toUpperCase())
                    ) {//Search input value available in location province name
                        return room;
                    }
                }
            });
            state.filteredRoomList = newRoomList;
        },
    },
    extraReducers: {
        //Call API fetch roomList data 
        [getRoomList.pending]: (state, action) => {
            state.roomList = [];
        },
        [getRoomList.fulfilled]: (state, action) => {
            state.roomList = action.payload;
        },
        [getRoomList.rejected]: (state, action) => { },

        //Call API fetch room detailed info to edit it
        [getRoomInfo.pending]: (state, action) => {
            state.roomInfo = {};
            state.isFormEditOpen = true; //Open them form edit room info
        },
        [getRoomInfo.fulfilled]: (state, action) => {
            state.roomInfo = action.payload;
        },
        [getRoomInfo.rejected]: (state, action) => { },

        [editRoom.pending]: (state, action) => {
            state.isFormEditOpen = false; //Close them form edit room info
        },
        [editRoom.fulfilled]: (state, action) => {
            //Update new info of the room at redux state
            if (state.filteredRoomList?.length > 0) {//Admin search the room before edit information
                let filteredRoomListClone = [...state.filteredRoomList];
                let indexEditedRoomFiltered = filteredRoomListClone.findIndex(room => {
                    return room._id === action.payload._id;
                });
                if (indexEditedRoomFiltered !== -1) {
                    state.filteredRoomList[indexEditedRoomFiltered] = action.payload;
                };

                let roomListClone = [...state.roomList];
                let indexEditedRoom = roomListClone.findIndex(room => {
                    return room._id === action.payload._id;
                });
                if (indexEditedRoom !== -1) {
                    state.roomList[indexEditedRoom] = action.payload;
                };
            } else {//Admin access direct to the room editing information
                let roomListClone = [...state.roomList];
                let indexEditedRoom = roomListClone.findIndex(room => {
                    return room._id === action.payload._id;
                });
                if (indexEditedRoom !== -1) {
                    state.roomList[indexEditedRoom] = action.payload;
                };
            }
        },

        [deleteRoom.fulfilled]: (state, action) => {
            //Delete the room at redux state
            let roomListClone = [...state.roomList];
            let indexEditedRoom = roomListClone.findIndex(room => {
                return room._id === action.payload._id;
            });
            if (indexEditedRoom !== -1) {
                state.roomList.splice(indexEditedRoom, 1);
            };
        },
    },
});
const { reducer, actions } = roomSlice;

export const selectRoomList = (state) => state.roomSlice.roomList;
export const selectFilteredRoomList = (state) => state.roomSlice.filteredRoomList;
export const selectRoomInfo = (state) => state.roomSlice.roomInfo;
export const selectFormEditStatus = (state) => state.roomSlice.isFormEditOpen;
export const selectFormAddNewRoomStatus = (state) => state.roomSlice.isFormAddNewRoomOpen;

export const { closeFormAddNewRoomInfo, openFormAddNewRoomInfo, openFormEditRoomInfo, closeFormEditRoomInfo, searchRoomListByLocationName } = actions;

export default reducer;
