import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { columnsLocationManagement } from "../../utils/locationManagement";
import { useDispatch, useSelector } from "react-redux";
import { getLocationList } from "../../redux/locationSlice";
export default function TableLocationManagement() {
    const { locationFilterredList } = useSelector(
        (state) => state.locationSlice
    );
    const [locationData, setLocationData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (locationFilterredList) {
            let arrNew = locationFilterredList.map((item) => {
                return { ...item, action: dispatch };
            });
            setLocationData(arrNew);
        }
    }, [locationFilterredList]);
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
                // onChange={(e) => console.log(e)}
            ></Table>
        </div>
    );
}
