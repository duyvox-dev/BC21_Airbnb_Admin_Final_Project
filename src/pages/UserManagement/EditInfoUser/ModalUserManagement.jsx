import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal/Modal";
import { Dialog } from "@headlessui/react";
import { openCloseModalEdit } from "../../../redux/userSlice";
import FormInfoUser from "./FormInfoUser";

export default function ModalUserManagement() {
  const { valueModalEdit } = useSelector((state) => state.userSlice);
  const { dataListUserAction } = useSelector((state) => state.userSlice);
  let dispatch = useDispatch();

  let onClose = () => {
    dispatch(openCloseModalEdit(false));
  };

  return (
    <Modal
      isOpen={valueModalEdit}
      onClose={onClose}
      children={
        <Dialog.Panel className="w-full md:max-w-[30rem] lg:max-w-[35rem] max-w-[21rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900 text-center p-5 border-b"
          >
            Thông tin người dùng
          </Dialog.Title>
          <div className="my-5">
            <div className="p-5 space-y-3 overflow-y-scroll">
              {dataListUserAction ? <FormInfoUser /> : ""}
            </div>
          </div>
        </Dialog.Panel>
      }
    />
  );
}
