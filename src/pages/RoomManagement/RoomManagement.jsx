import React, { useEffect } from "react";
import { Input } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRoomList, selectRoomList } from "../../redux/roomSlice";
import TableRoomManagement from "./TableRoomManagement/TableRoomManagement";
import styles from '../css/RoomManagement.css';
import { getLocationList } from "../../redux/locationSlice";
const { Search } = Input;

export default function RoomManagement() {

  let navigate = useNavigate();
  let dispatch = useDispatch();

  //Authorizate admin account before access
  const { isLoggedIn } = useSelector((state) => state.authSlice);
  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(getRoomList()); //Call API fetch roomList
    dispatch(getLocationList()); //Call API fetch locationList
  }, []);

  let roomList = useSelector(selectRoomList); //Get roomList data from roomSlice redux state
  let { locationList } = useSelector((state) => state.locationSlice); //Get locationList data from locationSlice redux state

  const onSearch = (value) => {//Get value from search input element
    if (locationList?.length > 0) {
      let indexLocation = locationList.findIndex(location => location.province.toLowerCase() === value.toLowerCase());
      console.log(indexLocation);
      if (indexLocation !== -1) {
        dispatch(getRoomList(locationList[indexLocation]?._id)); //Call API fetch roomList according to location id
      };
    };
  };

  return (
    <div className="room-management-page">
      <div className="pl-72 pr-12 space-y-5">
        <div className="w-full flex justify-end">
          <span className="inline-block mt-5 text-white bg-rose-500 px-5 py-1 cursor-pointer rounded">
            Thêm phòng mới
          </span>
        </div>
        <div className="w-full">
          <Search
            placeholder="Tìm kiếm phòng theo tên khu vực"
            allowClear
            enterButton="Tìm kiếm"
            onSearch={onSearch}
          />
        </div>
        <TableRoomManagement roomList={roomList} />
      </div>
    </div>
  );
}
