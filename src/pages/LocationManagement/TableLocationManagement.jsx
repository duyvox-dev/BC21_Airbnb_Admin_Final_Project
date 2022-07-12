import React, { useEffect } from "react";
import { Table } from "antd";
import { columnsLocationManagement } from "../../utils/locationManagement";
import { useDispatch, useSelector } from "react-redux";
import { getLocationList } from "../../redux/locationSlice";
export default function TableLocationManagement() {
    const { locationList } = useSelector((state) => state.locationSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLocationList());
    }, []);
    return (
        <div>
            <Table
                bordered
                dataSource={locationList}
                columns={columnsLocationManagement}
                rowKey={"_id"}
                onChange={(e) => console.log(e)}
            ></Table>
        </div>
    );
}
