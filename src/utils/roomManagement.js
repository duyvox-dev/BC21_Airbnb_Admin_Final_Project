import { Popover } from 'antd';
import { openCloseModalEdit } from '../redux/userSlice';

export const columnsRoomManagement = [
    {
        title: 'Khu vực',
        dataIndex: 'locationId',
        key: 'locationId',
        align: 'center',
        width: 150,
        render: (locationId) => {
            return (
                <div className="flex flex-wrap items-center justify-center">
                    <p className="w-full">{locationId?.name}</p>
                    <p className="w-full">{locationId?.province}</p>
                </div>
            );
        },
    },

    {
        title: 'Tên phòng',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        sorter: true,
        sorter: (a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        },
    },

    {
        title: 'Hình ảnh',
        dataIndex: 'image',
        key: 'image',
        align: 'center',
        render: (image) => {
            return (
                <div className="flex justify-center">
                    <img className="h-20" src={image} alt={image} />
                </div>
            );
        },
    },

    {
        title: 'Giá thuê',
        dataIndex: `price`,
        key: 'price',
        align: 'center',
        sorter: true,
        width: 150,
        sorter: (a, b) => {
            if (a.price > b.price) {
                return 1;
            }
            if (a.price < b.price) {
                return -1;
            }
            return 0;
        },
        render: (price) => {
            return (
                <div className="flex flex-wrap items-center justify-center">
                    <p className="w-full">{price?.toLocaleString()} VND</p>
                </div>
            );
        },
    },

    {
        title: 'Số phòng còn hiện tại',
        dataIndex: 'bedRoom',
        key: 'bedRoom',
        align: 'center',
        width: 120,
    },

    {
        title: 'Số khách thuê hiện tại',
        dataIndex: 'guests',
        key: 'guests',
        align: 'center',
        width: 120,
    },

    {
        title: 'Tiện nghi',
        dataIndex: 'roomConvenience',
        key: 'roomConvenience',
        align: 'center',
        render: (roomConvenience) => {
            return (
                <div className="grid grid-cols-3">
                    {roomConvenience
                        ?.filter((item) => item.isAvailable)
                        .map((item, index) => {
                            return (
                                <div key={index} className="m-1">
                                    <Popover
                                        content={
                                            <p className="text-center">
                                                {item.name}
                                            </p>
                                        }
                                        trigger="hover"
                                    >
                                        <img
                                            className="w-5 h-5"
                                            src={item.image}
                                            alt={item.name}
                                        />
                                    </Popover>
                                </div>
                            );
                        })}
                </div>
            );
        },
    },

    {
        title: 'Thao tác',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (action, record) => {
            return (
                <div className="flex justify-center w-full h-full space-x-4">
                    <button
                        className="px-4 py-2 text-white bg-blue-600 rounded"
                        onClick={() => {
                            action.editRoomAction(record._id); //Pass roomID getting the room information in order to edit
                            action.dispatch(openCloseModalEdit(true));
                        }}
                    >
                        Sửa
                    </button>
                    <button
                        className="px-4 py-2 text-white bg-red-600 rounded"
                        onClick={() => {
                            action.deleteRoomAction(record._id); //Pass roomID in order to delete the room
                        }}
                    >
                        Xóa
                    </button>
                </div>
            );
        },
    },
];
