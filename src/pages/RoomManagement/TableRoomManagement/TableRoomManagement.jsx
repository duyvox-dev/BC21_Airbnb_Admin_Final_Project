import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "antd";
import { columnsRoomManagement } from '../../../utils/roomManagement';

export default function TableRoomManagement({ roomList }) {

    return (
        <div>
            <Table
                bordered
                dataSource={roomList}
                columns={columnsRoomManagement}
                rowKey={"_id"}
                onChange={(e) => console.log(e)}
            ></Table>
        </div>
    );
}
