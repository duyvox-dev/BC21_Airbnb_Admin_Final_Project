import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { columnsRoomManagement } from '../../../utils/roomManagement';
import {
    closeFormEditRoomInfo,
    deleteRoom,
    getRoomInfo,
    selectFormEditStatus,
    selectRoomInfo,
} from '../../../redux/roomSlice';
import FormEditRoomInfo from '../FormEditRoomInfo/FormEditRoomInfo';
import wifiIcon from '../../../assets/img/room-convenience/wifi.png';
import poolIcon from '../../../assets/img/room-convenience/pool.png';
import campfireIcon from '../../../assets/img/room-convenience/bonfire.png';
import kitchenIcon from '../../../assets/img/room-convenience/chef.png';
import cableTVIcon from '../../../assets/img/room-convenience/tv.png';
import hairDryerIcon from '../../../assets/img/room-convenience/dryer.png';
import elevatorIcon from '../../../assets/img/room-convenience/elevator.png';
import gymIcon from '../../../assets/img/room-convenience/gym.png';
import heaterIcon from '../../../assets/img/room-convenience/heater.png';
import hotTubIcon from '../../../assets/img/room-convenience/bath-tub.png';

export default function TableRoomManagement({ roomList }) {
    let dispatch = useDispatch();

    //Control display status of form edit room info when click outside to close it
    const ref = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current?.contains(event.target)) {
                dispatch(closeFormEditRoomInfo());
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
    }, [ref]);

    const handleEditRoom = (idRoom) => {
        dispatch(getRoomInfo(idRoom));
        window.scrollTo(0, 200);
    };

    const handleDeleteRoom = (idRoom) => {
        if (window.confirm('Bạn có chắc muốn xoá phòng này?')) {
            dispatch(deleteRoom(idRoom));
        }
    };

    //Refactor roomList data in order adding roomConvenience details & 2 handle actions
    let roomListUpdate = [];
    const refactorRoomListData = () => {
        if (roomList?.length > 0) {
            roomListUpdate = roomList.map((room, index) => {
                return {
                    name: room.name,
                    _id: room._id,
                    price: room.price,
                    bath: room.bath,
                    bedRoom: room.bedRoom,
                    description: room.description,
                    image: room.image,
                    guests: room.guests,
                    locationId: room.locationId,
                    roomConvenience: [
                        {
                            image: wifiIcon,
                            name: 'Free Wifi',
                            isAvailable: room.wifi,
                        },
                        {
                            image: poolIcon,
                            name: 'Hồ bơi',
                            isAvailable: room.pool,
                        },
                        {
                            image: campfireIcon,
                            name: 'Đốt lửa trại',
                            isAvailable: room.indoorFireplace,
                        },
                        {
                            image: kitchenIcon,
                            name: 'Nhà bếp',
                            isAvailable: room.kitchen,
                        },
                        {
                            image: cableTVIcon,
                            name: 'Tivi truyền hình cáp',
                            isAvailable: room.cableTV,
                        },
                        {
                            image: hairDryerIcon,
                            name: 'Máy sấy tóc',
                            isAvailable: room.dryer,
                        },
                        {
                            image: elevatorIcon,
                            name: 'Thang máy',
                            isAvailable: room.elevator,
                        },
                        {
                            image: gymIcon,
                            name: 'Khu tập gym',
                            isAvailable: room.gym,
                        },
                        {
                            image: heaterIcon,
                            name: 'Lò sưởi ấm',
                            isAvailable: room.heating,
                        },
                        {
                            image: hotTubIcon,
                            name: 'Bồn tắm nước nóng',
                            isAvailable: room.hotTub,
                        },
                    ],
                    action: {
                        deleteRoomAction: handleDeleteRoom,
                        editRoomAction: handleEditRoom,
                    },
                };
            });
        }
    };
    refactorRoomListData();
    let roomInfo = useSelector(selectRoomInfo);
    let formEditStatus = useSelector(selectFormEditStatus);

    return (
        <div className="relative w-full">
            <Table
                bordered
                dataSource={roomListUpdate}
                columns={columnsRoomManagement}
                rowKey={'_id'}
                // onChange={(e) => console.log(e)}
            ></Table>
            {formEditStatus ? (
                <div className="absolute top-0 z-10 w-full">
                    <div className="fixed inset-0 bg-black/30" ref={ref} />
                    <div className="absolute w-full">
                        {roomInfo._id && (
                            <FormEditRoomInfo roomInfo={roomInfo} />
                        )}
                    </div>
                </div>
            ) : (
                <Fragment />
            )}
        </div>
    );
}
