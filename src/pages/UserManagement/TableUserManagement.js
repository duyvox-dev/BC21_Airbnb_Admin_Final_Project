import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnsUserManagement } from "../../utils/userManagement";
import { getListUser } from "../../redux/userSlice";
import ModalUserManagement from "./ModalUserManagement";

export default function TableUserManagement() {
  const { dataListUser } = useSelector((state) => state.userSlice);
  const [data, setData] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
    if (dataListUser) setData(dataListUser);
  }, [dataListUser]);

  useEffect(() => {
    dispatch(getListUser())
      .unwrap()
      .then((res) => {
        let arrNew = res?.map((item) => {
          return { ...item, action: dispatch };
        });
        setData(arrNew);
      })
      .catch((err) => {
        console.log(err);
      });
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
    </>
  );
}
