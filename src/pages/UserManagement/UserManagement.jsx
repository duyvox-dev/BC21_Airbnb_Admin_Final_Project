import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableUserManagement from "./TableUserManagement";

export default function UserManagement() {
  const { isLoggedIn } = useSelector((state) => state.authSlice);
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <div className="pl-72 pr-12 space-y-5">
      <div className=" text-lg font-medium mt-5 flex justify-center">
        <button className="bg-[#ff5a5f] text-white py-1 px-4 rounded-md">
          Thêm quản trị viên
        </button>
      </div>
      <div className="flex justify-center space-x-4">
        <input
          className="w-full border-2 border-black rounded-md px-5 text-lg"
          type="text"
          placeholder="Nhập vào họ tên bạn muốn tìm"
        />
        <button className="px-5 py-3 bg-slate-600 text-white rounded-md font-medium">
          Tìm
        </button>
      </div>
      <TableUserManagement />
    </div>
  );
}
