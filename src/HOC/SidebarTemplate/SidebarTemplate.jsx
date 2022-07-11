import React from "react";
import { NavLink } from "react-router-dom";

export default function SidebarTemplate() {
    // const defaultClassName =
    //     "block text-black text-center w-full py-2 hover:text-black";
    // const activeClassName =
    //     "block text-white text-center bg-gray-600 py-2 w-full rounded hover:text-white";
    const defaultClassName =
        "text-black hover:text-black relative cursor-pointer transition-all duration-300 after:w-full after:-translate-x-[150%] after:h-[2px] after:absolute after:content-[''] after:-bottom-1 after:left-0 hover:after:w-full hover:after:translate-x-0 hover:after:bg-black after:transition-all after:duration-300";
    const activeClassName =
        "text-black hover:text-black relative cursor-pointer transition-all duration-300 after:w-full  after:h-[2px] after:absolute after:content-[''] after:-bottom-1 after:left-0 after:bg-black after:transition-all after:duration-300";
    return (
        <div className="fixed left-0 bottom-0 top-20 h-full w-60">
            <div className="h-full w-full shadow-md">
                <div className="pt-16 px-5 flex flex-col justify-start space-y-8">
                    <div className="text-lg font-medium w-full">
                        <NavLink
                            to="/user"
                            className={({ isActive }) =>
                                isActive ? activeClassName : defaultClassName
                            }
                        >
                            Quản lí người dùng
                        </NavLink>
                    </div>
                    <div className="text-lg font-medium">
                        <NavLink
                            to="/location"
                            className={({ isActive }) =>
                                isActive ? activeClassName : defaultClassName
                            }
                        >
                            Quản lí thông tin vị trí
                        </NavLink>
                    </div>
                    <div className="text-lg font-medium">
                        <NavLink
                            to="/room"
                            className={({ isActive }) =>
                                isActive ? activeClassName : defaultClassName
                            }
                        >
                            Quản lí thông tin phòng
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
