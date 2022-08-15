import React, { Fragment, useEffect, useRef, useState } from "react";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    closeFormAddNewRoomInfo,
    getRoomList,
    openFormAddNewRoomInfo,
    searchRoom,
    selectFilteredRoomList,
    selectFormAddNewRoomStatus,
    selectRoomList,
} from "../../redux/roomSlice";
import TableRoomManagement from "./TableRoomManagement/TableRoomManagement";
import styles from "../css/RoomManagement.css";
import FormAddNewRoom from "./FormAddNewRoom/FormAddNewRoom";
const { Search } = Input;

export default function RoomManagement() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    //Authorizate admin account before access
    const { isLoggedIn } = useSelector((state) => state.authSlice);
    useEffect(() => {
        if (!isLoggedIn) navigate("/");
    }, [isLoggedIn]);

    //Control display status of form edit room info when click outside to close it
    let formAddNewRoomStatus = useSelector(selectFormAddNewRoomStatus);
    const ref = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current?.contains(event.target)) {
                dispatch(closeFormAddNewRoomInfo());
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
    }, [ref]);

    let allRooms = useSelector(selectRoomList); //Get all roomList data from roomSlice redux state
    let filteredRooms = useSelector(selectFilteredRoomList); //Get filtered roomList data from roomSlice redux state
    let [roomList, setRoomList] = useState([]); //Default value is allRooms

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

    return (
        <div className="room-management-page">
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
                    <p className="text-left text-red-500">
                        * Nhập tên tỉnh thành đầy đủ và có dấu
                    </p>
                </div>
                <div className="w-full">
                    <TableRoomManagement
                        roomList={
                            filteredRooms?.length > 0 ? roomList : allRooms
                        }
                    />
                </div>
            </div>
            {formAddNewRoomStatus ? (
                <div className="w-full absolute top-0 z-10">
                    <div className="bg-black/30 fixed inset-0" ref={ref} />
                    <div className="w-11/12 absolute top-5 left-14">
                        <FormAddNewRoom />
                    </div>
                </div>
            ) : (
                <Fragment />
            )}
        </div>
    );
}
