import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    filterLocation,
    getLocationList,
    toggleAddLocationModal,
} from "../../redux/locationSlice";
import TableLocationManagement from "./TableLocationManagement";
import EditLocationModal from "./EditLocation/EditLocationModal";
import AddLocationModal from "./AddLocation/AddLocationModal";
export default function LocationManagement() {
    const { isLoggedIn } = useSelector((state) => state.authSlice);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState("");
    document.title = "Location Management - Airbnb";
    useEffect(() => {
        if (!isLoggedIn) navigate("/");
    }, [isLoggedIn]);

    useEffect(() => {
        dispatch(getLocationList());
    }, []);
    const handleAddLocation = () => {
        dispatch(toggleAddLocationModal());
    };
    const handleSearch = (searchValue) => {
        setSearchKey(searchValue);
        dispatch(filterLocation(searchValue));
    };
    return (
        <div>
            <EditLocationModal />
            <AddLocationModal />
            <div className="pl-72 pr-12 space-y-5">
                <span
                    className="inline-block mt-5 text-white bg-rose-500 px-5 py-1 cursor-pointer rounded"
                    onClick={handleAddLocation}
                >
                    Thêm Vị trí
                </span>
                <input
                    className="w-full h-12 border-2 border-black rounded-md px-5 text-lg"
                    type="text"
                    placeholder="Nhập vào họ tên bạn muốn tìm"
                    value={searchKey}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <TableLocationManagement />
            </div>
        </div>
    );
}
