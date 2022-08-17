import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal/Modal";
import { Dialog } from "@headlessui/react";
import { closeFormAddNewRoomInfo } from "../../../redux/roomSlice";
import FormAddNewRoom from "./FormAddNewRoom";

export default function ModalAddRoomManagement() {
    const { isFormAddNewRoomOpen } = useSelector((state) => state.roomSlice);
    let dispatch = useDispatch();

    let onClose = () => {
        dispatch(closeFormAddNewRoomInfo());
    };

    return (
        <Modal
            isOpen={isFormAddNewRoomOpen}
            onClose={onClose}
            children={
                <Dialog.Panel className="w-full md:max-w-[30rem] lg:max-w-[35rem] max-w-[21rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="p-5 text-lg font-medium leading-6 text-center text-gray-900 border-b"
                    >
                        Đăng ký thông tin phòng cho thuê mới
                    </Dialog.Title>
                    <div className="my-5">
                        <div className="p-5 space-y-3 overflow-y-scroll h-[600px]">
                            <FormAddNewRoom />
                        </div>
                    </div>
                </Dialog.Panel>
            }
        />
    );
}
