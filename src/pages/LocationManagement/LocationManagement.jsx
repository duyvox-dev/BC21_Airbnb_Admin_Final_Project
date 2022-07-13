import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocationList } from "../../redux/locationSlice";
import TableLocationManagement from "./TableLocationManagement";
import EditLocationModal from "./EditLocation/EditLocationModal";
export default function LocationManagement() {
    const { isLoggedIn } = useSelector((state) => state.authSlice);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    document.title = "Location Management - Airbnb";
    useEffect(() => {
        if (!isLoggedIn) navigate("/");
    }, [isLoggedIn]);

    useEffect(() => {
        dispatch(getLocationList());
    }, []);
    return (
        <div>
            <EditLocationModal />
            <div className="pl-72 pr-12 space-y-5">
                <span className="inline-block mt-5 text-white bg-rose-500 px-5 py-1 cursor-pointer rounded">
                    Thêm Vị trí
                </span>
                <TableLocationManagement />
            </div>
        </div>
    );
}
