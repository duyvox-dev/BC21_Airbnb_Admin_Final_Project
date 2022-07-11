import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnsUserManagement } from "../../utils/userManagement";
import { getListUser } from "../../redux/userSlice";

export default function TableUserManagement() {
  const { dataListUser } = useSelector((state) => state.userSlice);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListUser());
  }, []);

  return (
    <Table
      bordered
      dataSource={dataListUser}
      columns={columnsUserManagement}
      rowKey={"_id"}
      onChange={(e) => console.log(e)}
    />
  );
}
