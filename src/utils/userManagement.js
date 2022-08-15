import { Button, Popover } from 'antd';
import userPic from '../assets/img/user_pic.png';
import {
    openCloseModalEdit,
    getInfoUser,
    getIdUserPut,
    deleteUser,
    handleChangeVisible,
} from '../redux/userSlice';

export const columnsUserManagement = [
    {
        title: 'Tên',
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        align: 'center',
        className: 'font-medium',
        sorter: (a, b) => {
            if (a.email > b.email) {
                return 1;
            }
            if (a.email < b.email) {
                return -1;
            }
            return 0;
        },
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
        sorter: (a, b) => {
            if (a.address > b.address) {
                return 1;
            }
            if (a.address < b.address) {
                return -1;
            }
            return 0;
        },
    },

    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
    },
    {
        title: 'Mã loại',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
    },
    {
        title: 'Thao tác',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: ({ dispatch, visible }, record) => {
            return (
                <div className="flex justify-center w-full h-full space-x-4">
                    <button
                        className="px-4 py-2 font-medium text-white transition-all bg-blue-600 rounded hover:opacity-80"
                        onClick={() => (
                            dispatch(getInfoUser(record._id)),
                            dispatch(getIdUserPut(record._id)),
                            dispatch(openCloseModalEdit(true))
                        )}
                        d
                    >
                        Sửa
                    </button>
                    <Popover
                        className="z-10"
                        content={
                            <div className="flex justify-end space-x-4">
                                <button
                                    className="px-4 py-2 font-medium text-blue-500 rounded hover:bg-gray-200"
                                    onClick={() =>
                                        dispatch(
                                            handleChangeVisible({
                                                id: null,
                                                value: false,
                                            })
                                        )
                                    }
                                >
                                    Huỷ
                                </button>
                                <button
                                    className="px-4 py-2 font-medium text-white transition-all bg-blue-600 rounded hover:opacity-80"
                                    onClick={() =>
                                        dispatch(deleteUser(record._id))
                                    }
                                >
                                    Đồng ý
                                </button>
                            </div>
                        }
                        placement="bottomLeft"
                        title="Bạn có muốn xoá người dùng này không?"
                        trigger="click"
                        visible={
                            visible.id === record._id ? visible.value : false
                        }
                        onVisibleChange={() => {
                            dispatch(
                                handleChangeVisible({
                                    id: record._id,
                                    value: true,
                                })
                            );
                        }}
                    >
                        <button className="px-4 py-2 font-medium text-white transition-all bg-red-600 rounded hover:opacity-80">
                            Xóa
                        </button>
                    </Popover>
                </div>
            );
        },
    },
];
