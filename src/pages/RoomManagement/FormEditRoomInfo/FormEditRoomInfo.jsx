import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, InputNumber, message, Select, Switch } from 'antd';
import { closeFormEditRoomInfo, editRoom } from '../../../redux/roomSlice';
import { getLocationList } from '../../../redux/locationSlice';
import { openCloseModalEdit } from '../../../redux/userSlice';
const { Option } = Select;

const { TextArea } = Input;

export default function FormEditRoomInfo({ roomInfo }) {
    let dispatch = useDispatch();

    //Find location ID according to location name
    useEffect(() => {
        dispatch(getLocationList());
    }, []);
    let idLocation = '';
    let locationList = useSelector((state) => state.locationSlice.locationList);
    let indexLocation = locationList?.findIndex((location) => {
        return location.name === roomInfo?.locationId?.name;
    });
    if (indexLocation !== -1) {
        idLocation = locationList[indexLocation]._id;
    }

    let renderLocation = () => {
        return locationList.map((location) => {
            return (
                <Option key={location._id} value={location._id}>
                    {location.name} - {location.province}
                </Option>
            );
        });
    };

    const validateMessages = {
        required: '${label} không được để trống',
        types: {
            number: '${label} không hợp lệ',
        },
    };

    const onFinish = (values) => {
        let locationId = null;
        if (roomInfo?.locationId?.name) {
            locationId = locationList
                .map((location) => {
                    if (
                        `${location.name} - ${location.province}` ===
                        values.locationId
                    ) {
                        return location;
                    }
                })
                .filter((item) => item !== undefined);
        }
        if (locationId) {
            values.locationId = locationId[0]?._id;
        }

        let data = {
            idRoom: roomInfo._id,
            formData: values,
        };
        dispatch(editRoom(data));
        dispatch(openCloseModalEdit(false));
    };

    const onFinishFailed = (errorInfo) => {
        message.error(
            'Cập nhật thông tin thất bại, vui lòng kiểm tra lại thông tin'
        );
    };

    return (
        <div className="container relative mx-auto">
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                validateMessages={validateMessages}
                autoComplete="off"
                layout="vertical"
                className="w-full"
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="Tên phòng"
                    name="name"
                    required
                    hasFeedback
                    rules={[{ required: true }]}
                    initialValue={roomInfo?.name}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mô tả phòng"
                    name="description"
                    required
                    hasFeedback
                    rules={[{ required: true }]}
                    initialValue={roomInfo?.description}
                >
                    <TextArea />
                </Form.Item>

                <Form.Item
                    label="Địa điểm"
                    name="locationId"
                    initialValue={
                        roomInfo?.locationId?.name &&
                        `${roomInfo?.locationId?.name} - ${roomInfo?.locationId?.province}`
                    }
                    rules={[{ required: true }]}
                >
                    <Select placeholder="--- Chọn địa điểm ---">
                        {renderLocation()}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Giá thuê"
                    name="price"
                    initialValue={roomInfo?.price}
                    rules={[{ required: true }]}
                    className="w-full"
                >
                    <InputNumber
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Số lượng nhà tắm"
                    name="bath"
                    initialValue={roomInfo?.bath}
                    rules={[{ required: true }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Số lượng phòng"
                    name="bedRoom"
                    initialValue={roomInfo?.bedRoom}
                    rules={[{ required: true }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Số lượng khách"
                    name="guests"
                    initialValue={roomInfo?.guests}
                    rules={[{ required: true }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <div className="flex w-full justify-evenly">
                    <div>
                        <Form.Item
                            label="WIFI"
                            name="wifi"
                            valuePropName="checked"
                            initialValue={roomInfo?.wifi}
                        >
                            <Switch checked={roomInfo?.wifi ? true : false} />
                        </Form.Item>
                        <Form.Item
                            label="Hồ bơi"
                            name="pool"
                            initialValue={roomInfo?.pool}
                            valuePropName="checked"
                        >
                            <Switch checked={roomInfo?.pool ? true : false} />
                        </Form.Item>
                        <Form.Item
                            label="Đốt lửa trại"
                            name="indoorFireplace"
                            valuePropName="checked"
                            initialValue={roomInfo?.indoorFireplace}
                        >
                            <Switch
                                checked={
                                    roomInfo?.indoorFireplace ? true : false
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            label="Nhà bếp"
                            name="kitchen"
                            valuePropName="checked"
                            initialValue={roomInfo?.kitchen}
                        >
                            <Switch
                                checked={roomInfo?.kitchen ? true : false}
                            />
                        </Form.Item>
                        <Form.Item
                            label="TV truyền hình cáp"
                            name="cableTV"
                            valuePropName="checked"
                            initialValue={roomInfo?.cableTV}
                        >
                            <Switch
                                checked={roomInfo?.cableTV ? true : false}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Máy sấy tóc"
                            name="dryer"
                            valuePropName="checked"
                            initialValue={roomInfo?.dryer}
                        >
                            <Switch checked={roomInfo?.dryer ? true : false} />
                        </Form.Item>
                        <Form.Item
                            label="Thang máy"
                            name="elevator"
                            valuePropName="checked"
                            initialValue={roomInfo?.elevator}
                        >
                            <Switch
                                checked={roomInfo?.elevator ? true : false}
                            />
                        </Form.Item>
                        <Form.Item
                            label="GYM"
                            name="gym"
                            valuePropName="checked"
                            initialValue={roomInfo?.gym}
                        >
                            <Switch checked={roomInfo?.gym ? true : false} />
                        </Form.Item>
                        <Form.Item
                            label="Lò sưởi ấm"
                            name="heating"
                            valuePropName="checked"
                            initialValue={roomInfo?.heating}
                        >
                            <Switch
                                checked={roomInfo?.heating ? true : false}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Bồn tắm nước nóng"
                            name="hotTub"
                            valuePropName="checked"
                            initialValue={roomInfo?.hotTub}
                        >
                            <Switch checked={roomInfo?.hotTub ? true : false} />
                        </Form.Item>
                    </div>
                </div>

                <button
                    type="submit"
                    className="fixed bottom-0 left-0 w-full py-2 text-base font-bold text-white uppercase bg-rose-500"
                >
                    Cập nhật
                </button>
            </Form>
        </div>
    );
}
