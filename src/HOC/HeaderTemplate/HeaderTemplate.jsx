import React from "react";
import { NavLink } from "react-router-dom";
import logo3 from "../../assets/img/airbnb-logo3.png";
import MenuHeader from "./MenuHeader";

export default function HeaderTemplate() {
    return (
        <div className="w-full h-20 shadow fixed top-0 z-[999] bg-white">
            <div className="w-10/12 h-full mx-auto flex justify-between items-center">
                <NavLink to="/user">
                    <img className="w-40 h-12" src={logo3} alt={logo3} />
                </NavLink>
                <MenuHeader />
            </div>
        </div>
    );
}
