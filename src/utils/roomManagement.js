import { Fragment } from "react";
import { Popover } from 'antd';

export const columnsRoomManagement = [
    {
        title: "Khu vực",
        dataIndex: "locationId",
        key: "locationId",
        align: "center",
        width: 150,
        render: (locationId) => {
            return (
                <div className="flex flex-wrap justify-center items-center">
                    <p className="w-full">
                        {locationId?.name}
                    </p>
                    <p className="w-full">
                        {locationId?.province}
                    </p>
                </div>
            );
        },
    },

    {
        title: "Tên phòng",
        dataIndex: "name",
        key: "name",
        align: "center",
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
        title: "Hình ảnh",
        dataIndex: "image",
        key: "image",
        align: "center",
        render: (image) => {
            return (
                <div className="flex justify-center">
                    <img className="h-20" src={image} alt={image} />
                </div>
            );
        },
    },

    {
        title: "Giá thuê",
        dataIndex: `price`,
        key: "price",
        align: "center",
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
                <div className="flex flex-wrap justify-center items-center">
                    <p className="w-full">
                        {price?.toLocaleString()} VND
                    </p>
                </div>
            );
        },
    },

    {
        title: "Số phòng còn hiện tại",
        dataIndex: "bedRoom",
        key: "bedRoom",
        align: "center",
        width: 120,
    },

    {
        title: "Số khách thuê hiện tại",
        dataIndex: "guests",
        key: "guests",
        align: "center",
        width: 120,
    },

    {
        title: "Tiện nghi",
        dataIndex: "roomConvenience",
        key: "roomConvenience",
        align: "center",
        render: (roomConvenience) => {
            return (
                <div className="grid grid-cols-3">
                    {
                        roomConvenience?.filter(item => item.isAvailable).map((item, index) => {
                            return <div
                                key={index}
                                className="m-1"
                            >
                                <Popover
                                    content={<p className="text-center">{item.name}</p>}
                                    trigger="hover">
                                    <img className="h-5 w-5" src={item.image} alt={item.name} />
                                </Popover>
                            </div>
                        })
                    }
                </div>
            );
        },
    },

    {
        title: "Thao tác",
        dataIndex: "action",
        key: "action",
        align: "center",
        render: (_, record) => {
            return (
                <div className="flex justify-center space-x-4 w-full h-full">
                    <button className="text-white bg-blue-600 px-4 py-2 rounded">
                        Sửa
                    </button>
                    <button className="text-white bg-red-600 px-4 py-2 rounded">
                        Xóa
                    </button>
                </div>
            );
        },
    },
];
