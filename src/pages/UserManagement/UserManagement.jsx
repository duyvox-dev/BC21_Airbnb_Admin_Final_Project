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
      <div className="text-left text-lg font-medium mt-5">
        Thêm quản trị viên
      </div>
      <TableUserManagement />
    </div>
  );
}
