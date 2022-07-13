import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    handleValueInputSearch,
    openCloseModalAdd,
} from "../../redux/userSlice";
import TableUserManagement from "./TableUserManagement";

export default function UserManagement() {
    const { isLoggedIn } = useSelector((state) => state.authSlice);
    const { valueInputSearch } = useSelector((state) => state.userSlice);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedIn) navigate("/");
    }, [isLoggedIn]);

    document.title = "Airbnb | Quản lí người dùng";

    return (
        <div className="pl-72 pr-12 space-y-5">
            <div className=" text-lg font-medium mt-5 flex justify-center">
                <button
                    className="bg-[#ff5a5f] text-white py-1 px-4 rounded-md"
                    onClick={() => dispatch(openCloseModalAdd(true))}
                >
                    Thêm quản trị viên
                </button>
            </div>
            <div className="flex justify-center space-x-4">
                <input
                    className="w-full h-12 border-2 border-black rounded-md px-5 text-lg"
                    type="text"
                    placeholder="Nhập vào họ tên bạn muốn tìm"
                    value={valueInputSearch}
                    onChange={(e) =>
                        dispatch(handleValueInputSearch(e.target.value))
                    }
                />
            </div>
            <TableUserManagement />
        </div>
    );
}
