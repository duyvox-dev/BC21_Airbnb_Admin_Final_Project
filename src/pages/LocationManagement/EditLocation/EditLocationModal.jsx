import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal/Modal";
import { Dialog } from "@headlessui/react";
import EditLocationForm from "./EditLocationForm";
import { toggleEditLocationModal } from "../../../redux/locationSlice";
export default function EditLocationModal() {
    const dispatch = useDispatch();
    const { currentLocation, modalEdit } = useSelector(
        (state) => state.locationSlice
    );
    let onClose = () => {
        dispatch(toggleEditLocationModal());
    };
    return (
        <div>
            <Modal
                isOpen={modalEdit}
                onClose={onClose}
                children={
                    <Dialog.Panel className="w-full md:max-w-[30rem] lg:max-w-[35rem] max-w-[21rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900 text-center p-5 border-b"
                        >
                            Thông tin vị trí
                        </Dialog.Title>
                        <div className="my-5">
                            <div className="p-5 space-y-3 overflow-y-scroll">
                                {currentLocation ? <EditLocationForm /> : <></>}
                            </div>
                        </div>
                    </Dialog.Panel>
                }
            />
        </div>
    );
}
