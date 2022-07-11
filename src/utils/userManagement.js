import userPic from "../assets/img/user_pic.png";

export const columnsUserManagement = [
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
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
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
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    align: "center",
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
    title: "Hình ảnh",
    dataIndex: "avatar",
    key: "avatar",
    align: "center",
    render: (img) => {
      return (
        <div className="flex justify-center">
          {img ? (
            <img className="h-16 w-24" src={img} alt={img} />
          ) : (
            <img className="h-16 w-24" src={userPic} alt={userPic} />
          )}
        </div>
      );
    },
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
    align: "center",
  },
  {
    title: "Mã loại",
    dataIndex: "type",
    key: "type",
    align: "center",
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
