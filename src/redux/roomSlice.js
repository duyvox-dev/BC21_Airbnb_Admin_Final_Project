import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { locationService } from "../services/locationService";
import { message } from "antd";
import { roomService } from "../services/roomService";
import wifiIcon from '../assets/img/room-convenience/wifi.png';
import poolIcon from '../assets/img/room-convenience/pool.png';
import campfireIcon from '../assets/img/room-convenience/bonfire.png';
import kitchenIcon from '../assets/img/room-convenience/chef.png';
import cableTVIcon from '../assets/img/room-convenience/tv.png';
import hairDryerIcon from '../assets/img/room-convenience/dryer.png';
import elevatorIcon from '../assets/img/room-convenience/elevator.png';
import gymIcon from '../assets/img/room-convenience/gym.png';
import heaterIcon from '../assets/img/room-convenience/heater.png';
import hotTubIcon from '../assets/img/room-convenience/bath-tub.png';

//Xử lý lại model data roomList fetch từ API 
const refactorRoomListDataModel = (dataRaw = []) => {
    return dataRaw.map((item, index) => {
        return {
            name: item.name,
            _id: item._id,
            price: item.price,
            bath: item.bath,
            bedRoom: item.bedRoom,
            description: item.description,
            image: item.image,
            guests: item.guests,
            locationId: item.locationId,
            roomConvenience: [
                {

                    image: wifiIcon,
                    name: 'Free Wifi',
                    isAvailable: item.wifi,
                },
                {
                    image: poolIcon,
                    name: 'Hồ bơi',
                    isAvailable: item.pool,
                },
                {
                    image: campfireIcon,
                    name: 'Đốt lửa trại',
                    isAvailable: item.indoorFireplace,
                },
                {
                    image: kitchenIcon,
                    name: 'Nhà bếp',
                    isAvailable: item.kitchen,
                },
                {
                    image: cableTVIcon,
                    name: 'Tivi truyền hình cáp',
                    isAvailable: item.cableTV,
                },
                {
                    image: hairDryerIcon,
                    name: 'Máy sấy tóc',
                    isAvailable: item.dryer,
                },
                {
                    image: elevatorIcon,
                    name: 'Thang máy',
                    isAvailable: item.elevator,
                },
                {
                    image: gymIcon,
                    name: 'Khu tập gym',
                    isAvailable: item.gym,
                },
                {
                    image: heaterIcon,
                    name: 'Lò sưởi ấm',
                    isAvailable: item.heating,
                },
                {
                    image: hotTubIcon,
                    name: 'Bồn tắm nước nóng',
                    isAvailable: item.hotTub,
                },
            ],
        }
    })
};

export const getRoomList = createAsyncThunk(
    "locatiohSlice/getLocationList",
    async (idLocation, thunkAPI) => {
        try {
            const result = await roomService.getRoomList(idLocation);
            let data = refactorRoomListDataModel(result.data);
            // console.log(result.data);
            return data;
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
        roomInfo: {},
    },
    reducers: {},
    extraReducers: {
        [getRoomList.pending]: (state, action) => {
            state.roomList = [];
        },
        [getRoomList.fulfilled]: (state, action) => {
            state.roomList = action.payload;
        },
        [getRoomList.rejected]: (state, action) => { },
    },
});
const { reducer, actions } = roomSlice;

export const selectRoomList = (state) => state.roomSlice.roomList;

export default reducer;
