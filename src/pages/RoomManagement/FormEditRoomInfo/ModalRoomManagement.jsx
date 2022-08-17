import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/Modal/Modal';
import { Dialog } from '@headlessui/react';
import { openCloseModalEdit } from '../../../redux/userSlice';
import FormInfoUser from '../../UserManagement/EditInfoUser/FormInfoUser';
import { selectRoomInfo } from '../../../redux/roomSlice';
import FormEditRoomInfo from './FormEditRoomInfo';

export default function ModalRoomManagement() {
    const { valueModalEdit } = useSelector((state) => state.userSlice);
    let dispatch = useDispatch();

    let onClose = () => {
        dispatch(openCloseModalEdit(false));
    };

    let roomInfo = useSelector(selectRoomInfo);

    return (
        <Modal
            isOpen={valueModalEdit}
            onClose={onClose}
            children={
                <Dialog.Panel className="w-full md:max-w-[30rem] lg:max-w-[35rem] max-w-[21rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="p-5 text-lg font-medium leading-6 text-center text-gray-900 border-b"
                    >
                        Thông tin phòng
                    </Dialog.Title>
                    <div className="my-5">
                        <div className="p-5 space-y-3 overflow-y-scroll h-[600px]">
                            {roomInfo._id && (
                                <FormEditRoomInfo roomInfo={roomInfo} />
                            )}
                        </div>
                    </div>
                </Dialog.Panel>
            }
        />
    );
}
