import React from "react";
import { NavLink } from "react-router-dom";

export default function SidebarTemplate() {
  return (
    <div className="fixed left-0 bottom-0 top-20 h-full w-60">
      <div className="h-full w-full shadow-md">
        <div className="pt-16 px-5 flex flex-col justify-start space-y-8">
          <div className="text-lg font-medium">
            <NavLink to="/user" className="text-black hover:text-black">
              <div className="relative cursor-pointer transition-all duration-300 after:w-full after:-translate-x-[150%] after:h-1 after:absolute after:content-[''] after:-bottom-1 after:left-0 hover:after:w-full hover:after:translate-x-0 hover:after:bg-black after:transition-all after:duration-300">
                Quản lí người dùng
              </div>
            </NavLink>
          </div>
          <div className="text-lg font-medium">
            <NavLink to="/location" className="text-black hover:text-black">
              <div className="relative cursor-pointer transition-all duration-300 after:w-full after:-translate-x-[150%] after:h-1 after:absolute after:content-[''] after:-bottom-1 after:left-0 hover:after:w-full hover:after:translate-x-0 hover:after:bg-black after:transition-all after:duration-300">
                Quản lí thông tin vị trí
              </div>
            </NavLink>
          </div>
          <div className="text-lg font-medium">
            <NavLink to="/room" className="text-black hover:text-black">
              <div className="relative cursor-pointer transition-all duration-300 after:w-full after:-translate-x-[150%] after:h-1 after:absolute after:content-[''] after:-bottom-1 after:left-0 hover:after:w-full hover:after:translate-x-0 hover:after:bg-black after:transition-all after:duration-300">
                Quản lí thông tin phòng
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
