import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { columnsLocationManagement } from "../../utils/locationManagement";
import { useDispatch, useSelector } from "react-redux";
import { getLocationList } from "../../redux/locationSlice";
export default function TableLocationManagement() {
    const { locationList } = useSelector((state) => state.locationSlice);
    const [locationData, setLocationData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (locationList) {
            let arrNew = locationList.map((item) => {
                return { ...item, action: dispatch };
            });
            setLocationData(arrNew);
        }
    }, [locationList]);
    useEffect(() => {
        dispatch(getLocationList());
    }, []);
    return (
        <div>
            <Table
                bordered
                dataSource={locationData}
                columns={columnsLocationManagement}
                rowKey={"_id"}
                onChange={(e) => console.log(e)}
            ></Table>
        </div>
    );
}
