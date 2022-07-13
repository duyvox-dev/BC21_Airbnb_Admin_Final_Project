import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnsUserManagement } from "../../utils/userManagement";
import { getListUser } from "../../redux/userSlice";
import ModalUserManagement from "./EditInfoUser/ModalUserManagement";
import ModalAddAdmin from "./AddAdmin/ModalAddAdmin.jsx";

export default function TableUserManagement() {
  const { dataListUser } = useSelector((state) => state.userSlice);
  const [data, setData] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
    if (dataListUser) {
      let arrNew = dataListUser.map((item) => {
        return { ...item, action: dispatch };
      });
      setData(arrNew);
    }
  }, [dataListUser]);

  useEffect(() => {
    dispatch(getListUser());
  }, []);

  return (
    <>
      <Table
        bordered
        dataSource={data}
        columns={columnsUserManagement}
        rowKey={"_id"}
      />
      <ModalUserManagement />
      <ModalAddAdmin />
    </>
  );
}
