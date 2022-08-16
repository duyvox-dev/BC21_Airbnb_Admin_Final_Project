import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Input, InputNumber, message, Select, Switch } from 'antd';
import {
    closeFormEditRoomInfo,
    editRoom,
    selectRoomInfo,
    uploadImage,
} from '../../../redux/roomSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faL } from '@fortawesome/free-solid-svg-icons';
import { getLocationList } from '../../../redux/locationSlice';
const { Option } = Select;

const { TextArea } = Input;

export default function FormEditRoomInfo({ roomInfo }) {
    console.log(roomInfo);
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

    let formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            image: null,
            name: roomInfo.name,
            price: roomInfo.price,
            bath: roomInfo.bath,
            bedRoom: roomInfo.bedRoom,
            description: roomInfo.description,
            guests: roomInfo.guests,
            locationId: idLocation,
            wifi: roomInfo.wifi,
            pool: roomInfo.pool,
            indoorFireplace: roomInfo.indoorFireplace,
            kitchen: roomInfo.kitchen,
            cableTV: roomInfo.cableTV,
            dryer: roomInfo.dryer,
            elevator: roomInfo.elevator,
            gym: roomInfo.gym,
            heating: roomInfo.heating,
            hotTub: roomInfo.hotTub,
        },
        onSubmit: (values) => {
            let data = {
                idRoom: roomInfo._id,
                formData: {
                    name: values.name,
                    price: values.price,
                    bath: values.bath,
                    bedRoom: values.bedRoom,
                    description: values.description,
                    guests: values.guests,
                    locationId: values.locationId,
                    wifi: values.wifi,
                    pool: values.pool,
                    indoorFireplace: values.indoorFireplace,
                    kitchen: values.kitchen,
                    cableTV: values.cableTV,
                    dryer: values.dryer,
                    elevator: values.elevator,
                    gym: values.gym,
                    heating: values.heating,
                    hotTub: values.hotTub,
                },
            };
            dispatch(editRoom(data));
            console.log(data);

            //Create image form data in order to call API send to server
            let formData = new FormData();
            formData.append('image', values.image);
            let dataImage = {
                idRoom: roomInfo._id,
                formData: formData,
            };
            dispatch(uploadImage(dataImage));
        },
    });

    let [imgUrl, setImgUrl] = useState('');
    const [valueImg, setValueImg] = useState(null);

    const handleUploadImage = (e) => {
        //Get file from event
        let file = e.target.files[0];
        setValueImg(file);
        // formik.setFieldValue('image', file);

        //Create file reader
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            let image = e.target.result;
            setImgUrl(image);
        };
    };

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
            values.locationId = locationId[0]._id;
        }

        let data = {
            idRoom: roomInfo._id,
            formData: values,
        };
        dispatch(editRoom(data));

        // upload img
        let img = valueImg ? valueImg : roomInfo.image;
        // let formData = new FormData();
        // formData.append('image', img);
        let dataImage = {
            idRoom: roomInfo._id,
            formData: img,
        };
        console.log(dataImage);
        dispatch(uploadImage(dataImage));
    };

    const onFinishFailed = (errorInfo) => {
        message.error(
            'Cập nhật thông tin thất bại, vui lòng kiểm tra lại thông tin'
        );
    };

    return (
        <div className="w-11/12 px-2 py-2 mx-auto bg-white rounded-md form-edit-room-info-page">
            <div className="flex justify-end w-full">
                <button
                    onClick={() => {
                        dispatch(closeFormEditRoomInfo());
                    }}
                >
                    <FontAwesomeIcon
                        className="text-3xl text-rose-500 hover:text-rose-700"
                        icon={faCircleXmark}
                    />
                </button>
            </div>
            <div className="w-11/12 mx-auto">
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                    autoComplete="off"
                    layout="vertical"
                    className="w-full"
                    initialValues={{ remember: true }}
                >
                    <h3 className="my-auto text-2xl font-bold text-center">
                        Cập nhật thông tin phòng
                    </h3>
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
                    <div className="flex justify-between w-full">
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
                            label="Năng suất khách phục vụ"
                            name="guests"
                            initialValue={roomInfo?.guests}
                            rules={[{ required: true }]}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </div>

                    <div className="grid w-full grid-cols-5 justify-items-center">
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

                    <Form.Item label="Hình ảnh phòng">
                        <img
                            className="w-96"
                            src={imgUrl ? imgUrl : roomInfo.image} //Display new uploaded image replace old one
                        />
                        <input
                            name="imgUpload"
                            type="file"
                            id="upload-photo"
                            className="absolute top-0 left-0 -z-10 cursor-none"
                            onChange={handleUploadImage}
                        />
                    </Form.Item>

                    <div className="flex justify-between w-full mt-5 mb-2">
                        <label
                            htmlFor="upload-photo"
                            className="px-3 py-1 my-auto border border-gray-300 cursor-pointer hover:bg-gray-200"
                        >
                            Tải hình ảnh mới
                        </label>
                        <button
                            type="submit"
                            className="px-4 py-2 text-base font-bold text-white rounded-lg bg-rose-500"
                        >
                            Cập nhật
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
