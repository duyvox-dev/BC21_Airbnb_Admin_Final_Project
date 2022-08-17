import React, { Fragment, useEffect, useRef, useState } from "react";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getRoomList,
    openFormAddNewRoomInfo,
    searchRoom,
    selectFilteredRoomList,
    selectRoomList,
} from "../../redux/roomSlice";
import TableRoomManagement from "./TableRoomManagement/TableRoomManagement";
import styles from "../css/RoomManagement.css";
import ModalAddRoomManagement from "./FormAddNewRoom/ModalAddRoomManagement";
const { Search } = Input;

export default function RoomManagement() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    //Control display status of form edit room info when click outside to close it

    let allRooms = useSelector(selectRoomList); //Get all roomList data from roomSlice redux state
    let filteredRooms = useSelector(selectFilteredRoomList); //Get filtered roomList data from roomSlice redux state
    let [roomList, setRoomList] = useState([]); //Default value is allRooms

    //Authorizate admin account before access
    const { isLoggedIn } = useSelector((state) => state.authSlice);
    useEffect(() => {
        if (!isLoggedIn) navigate("/");
    }, [isLoggedIn]);
    useEffect(() => {
        dispatch(getRoomList()); //Call API fetch roomList
    }, []);

    useEffect(() => {
        //re-render filteredRooms after admin edited room information
        setRoomList(filteredRooms);
    }, [filteredRooms]);

    const handleChangeSearchRoom = (e) => {
        if (e.target.value?.trim() !== "") {
            //If there is search input value
            dispatch(searchRoom(e.target.value));
            setRoomList(filteredRooms);
        } else {
            //In case remove search input value after typing
            setRoomList(allRooms);
        }
    };
    document.title = "Airbnb | Quản lý phòng";

    return (
        <div className="room-management-page">
            <ModalAddRoomManagement />
            <div className="pl-72 pr-12 space-y-5">
                <div className="w-full flex justify-end">
                    <span
                        className="inline-block mt-5 text-white bg-rose-500 px-5 py-1 cursor-pointer rounded"
                        onClick={() => {
                            dispatch(openFormAddNewRoomInfo());
                        }}
                    >
                        Thêm phòng mới
                    </span>
                </div>
                <div className="w-full">
                    <Search
                        placeholder="Tìm kiếm phòng theo tên tỉnh thành"
                        allowClear
                        enterButton="Tìm kiếm"
                        onChange={handleChangeSearchRoom}
                    />
                </div>
                <div className="w-full">
                    <TableRoomManagement
                        roomList={
                            filteredRooms?.length > 0 ? roomList : allRooms
                        }
                    />
                </div>
            </div>
        </div>
    );
}
