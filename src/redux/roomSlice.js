import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { roomService } from "../services/roomService";
import _ from 'lodash';
import { locationService } from "../services/locationService";

let initialState = {
    roomList: [],
    filteredRoomList: [],
    roomInfo: {},
    isFormEditOpen: false,
    isFormAddNewRoomOpen: false,
};

const getLocationInfor = async (locationId, initRoomData) => {
    const result = await locationService.getLocationInfo(locationId); //Find location details according to locationID

    let roomData = {//Add location details to roomInfo object
        ...initRoomData,
        locationId: result.data,
    };
    return roomData;
};

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
            const result = await roomService.upadteRoomInfo(idRoom, formData);
            message.success('Cập nhật thông tin phòng thành công!');

            return getLocationInfor(result.data.locationId, result.data);
            // const searchLocationInfoResult = await locationService.getLocationInfo(editRoomResult.data.locationId); //Find location details according to locationID

            // let refinedResult = {//Add location details to roomInfo object
            //     ...editRoomResult.data,
            //     locationId: searchLocationInfoResult.data,
            // };
            // return refinedResult;
        } catch (error) {
            // message.error(error.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const addRoom = createAsyncThunk(
    'roomSlice/addRoom',
    async (formData, thunkAPI) => {
        try {
            //Search room list in order to check the new room information is inexistent
            const roomListResult = await roomService.getRoomList(formData.locationId);
            let roomList = roomListResult.data;
            let roomExisted = false;

            for (let room of roomList) {
                if (room.name.localeCompare(formData.name, undefined, { sensitivity: 'base' }) === 0) {
                    roomExisted = true;
                }
            };

            if (roomExisted) {
                message.error('Phòng đã tồn tại, vui lòng kiểm tra lại!');
                throw new Error('Phòng đã tồn tại, vui lòng kiểm tra lại!');
            } else {
                const result = await roomService.createRoom(formData);
                message.success('Thêm phòng mới thành công!');
                return getLocationInfor(result.data.locationId, result.data);
            }
        } catch (error) {
            // message.error(error.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const uploadImage = createAsyncThunk(
    'roomSlice/uploadImage',
    async (dataImage, thunkAPI) => {
        try {
            let { idRoom, formData } = dataImage;
            let result = await roomService.uploadRoomImage(idRoom, formData);
            console.log(result.data);
            return result.data;
        } catch (error) {
            // message.error(error.response.data.message);
            console.log(error.response);
            return thunkAPI.rejectWithValue();
        }
    }
);

const roomSlice = createSlice({
    name: "roomSlice",
    initialState: initialState,
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
                    filteredRoomListClone[indexEditedRoomFiltered] = action.payload;
                    state.filteredRoomList = filteredRoomListClone;
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
                    roomListClone[indexEditedRoom] = action.payload;
                    state.filteredRoomList = roomListClone;
                };
            }
        },

        [addRoom.pending]: (state, action) => {
            state.isFormAddNewRoomOpen = false;
        },

        [addRoom.fulfilled]: (state, action) => {
            //Update new room at redux state
            if (state.filteredRoomList?.length > 0) {//Admin searched before add new room
                let filteredRoomListClone = [...state.filteredRoomList];
                filteredRoomListClone.push(action.payload);
                state.filteredRoomList = filteredRoomListClone;

                let roomListClone = [...state.roomList];
                roomListClone.push(action.payload);
                state.roomList = roomListClone;
            } else {//Admin direct add new room without searching
                let roomListClone = [...state.roomList];
                roomListClone.push(action.payload);
                state.roomList = roomListClone;
            }
        },

        [deleteRoom.fulfilled]: (state, action) => {
            //Delete the room at redux state
            if (state.filteredRoomList?.length > 0) {//Admin searched before add new room
                let filteredRoomListClone = [...state.filteredRoomList];
                let indexEditedRoomFiltered = filteredRoomListClone.findIndex(room => {
                    return room._id === action.payload._id;
                });
                if (indexEditedRoomFiltered !== -1) {
                    filteredRoomListClone.splice(indexEditedRoomFiltered, 1);
                    state.filteredRoomList = filteredRoomListClone;
                };

                let roomListClone = [...state.roomList];
                let indexEditedRoom = roomListClone.findIndex(room => {
                    return room._id === action.payload._id;
                });
                if (indexEditedRoom !== -1) {
                    roomListClone.splice(indexEditedRoom, 1);
                    state.roomList = roomListClone;
                };
            } else {//Admin direct add new room without searching
                let roomListClone = [...state.roomList];
                let indexEditedRoom = roomListClone.findIndex(room => {
                    return room._id === action.payload._id;
                });
                if (indexEditedRoom !== -1) {
                    roomListClone.splice(indexEditedRoom, 1);
                    state.roomList = roomListClone;
                };
            }
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
