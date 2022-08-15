import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormDangNhap from "./FormDangNhap/FormDangNhap";
import logo from "../../assets/img/airbnb-logo.png";

export default function DangNhapPage() {
    const { isLoggedIn } = useSelector((state) => state.authSlice);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/user");
        }
    }, [isLoggedIn]);

    document.title = "Airbnb | Đăng nhập";
    return (
        <div className="w-screen flex flex-col justify-start items-center pt-20">
            <div className="pb-5">
                <img className="w-96 h-52" src={logo} alt={logo} />
            </div>
            <FormDangNhap />
        </div>
    );
}
