import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../../components/Modal/Modal";
import { Dialog } from "@headlessui/react";
import { openCloseModalAdd } from "../../../redux/userSlice";
import FormAddAdmin from "./FormAddAdmin";

export default function ModalAddAdmin() {
  const { valueModalAdd } = useSelector((state) => state.userSlice);
  let dispatch = useDispatch();

  let onClose = () => {
    dispatch(openCloseModalAdd(false));
  };

  return (
    <Modal
      isOpen={valueModalAdd}
      onClose={onClose}
      children={
        <Dialog.Panel className="w-full md:max-w-[30rem] lg:max-w-[35rem] max-w-[21rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900 text-center p-5 border-b"
          >
            Thêm quản trị viên
          </Dialog.Title>
          <div className="my-5">
            <div className="p-5 space-y-3 overflow-y-scroll">
              <FormAddAdmin />
            </div>
          </div>
        </Dialog.Panel>
      }
    />
  );
}
