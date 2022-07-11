import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import userPic from "../../assets/img/user_pic.png";
import { dangXuat } from "../../redux/authSlice";

export default function MenuHeader() {
    const { adminLogin } = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();

    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="w-20 h-10 rounded-3xl p-2 bg-white text-sm font-medium text-black hover:shadow-lg border border-stone-400 transition-all duration-300 flex justify-between items-center">
                        <FontAwesomeIcon className="w-4 h-4" icon={faBars} />

                        {adminLogin ? (
                            adminLogin.avatar ? (
                                <img
                                    className="w-9 h-9 rounded-full"
                                    src={adminLogin.avatar}
                                    alt={adminLogin.avatar}
                                />
                            ) : (
                                <img
                                    className="w-9 h-9 rounded-full"
                                    src={userPic}
                                    alt={userPic}
                                />
                            )
                        ) : (
                            <FontAwesomeIcon
                                className="w-8 h-8"
                                icon={faCircleUser}
                            />
                        )}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute -right-1/4 mt-2 w-56 h-8 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex justify-center items-center cursor-pointer hover:bg-rose-500 hover:text-white transition-all duration-300">
                        <Menu.Item>
                            <div
                                className="text-lg text-center font-normal w-full"
                                onClick={() => dispatch(dangXuat())}
                            >
                                Đăng xuất
                            </div>
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
