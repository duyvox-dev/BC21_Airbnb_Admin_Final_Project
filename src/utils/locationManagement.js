import {
    deleteLocation,
    toggleEditLocationModal,
    getLocationInfo,
} from "../redux/locationSlice";
export const columnsLocationManagement = [
    {
        title: "Tên",
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
        title: "Tỉnh thành",
        dataIndex: "province",
        key: "province",
        align: "center",
        sorter: (a, b) => {
            if (a.province > b.province) {
                return 1;
            }
            if (a.province < b.province) {
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
        render: (img) => {
            return (
                <div className="flex justify-center">
                    <img className="h-16 w-24" src={img} alt={img} />
                </div>
            );
        },
    },
    {
        title: "Quốc gia",
        dataIndex: "country",
        key: "country",
        align: "center",
    },

    {
        title: "Thao tác",
        dataIndex: "action",
        key: "action",
        align: "center",
        render: (dispatch, record) => {
            return (
                <div className="flex justify-center space-x-4 w-full h-full">
                    <button
                        className="text-white bg-blue-600 px-4 py-2 rounded"
                        onClick={() => {
                            dispatch(getLocationInfo(record._id));
                            dispatch(toggleEditLocationModal());
                        }}
                    >
                        Sửa
                    </button>
                    <button
                        className="text-white bg-red-600 px-4 py-2 rounded"
                        onClick={() => dispatch(deleteLocation(record._id))}
                    >
                        Xóa
                    </button>
                </div>
            );
        },
    },
];
