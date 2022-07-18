import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, Field, ErrorMessage } from 'formik';
import { Form, Input, InputNumber, Switch } from 'antd';
import { closeFormEditRoomInfo, editRoom } from '../../../redux/roomSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { getLocationList } from '../../../redux/locationSlice';

const { TextArea } = Input;

export default function FormEditRoomInfo({ roomInfo }) {

    let dispatch = useDispatch();

    //Find location ID according to location name
    useEffect(() => {
        dispatch(getLocationList());
    }, []);
    let idLocation = '';
    let locationList = useSelector(state => state.locationSlice.locationList);
    let indexLocation = locationList?.findIndex(location => {
        return location.name === roomInfo?.locationId?.name;
    });
    if (indexLocation !== -1) {
        idLocation = locationList[indexLocation]._id;
    };

    let formik = useFormik({
        enableReinitialize: true,
        initialValues: {
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
                formData: values,
            };
            dispatch(editRoom(data));
        },
    });

    return (
        <div className='form-edit-room-info-page w-11/12 mx-auto px-2 py-2 bg-white rounded-md'>
            <div className='w-full flex justify-end'>
                <button
                    onClick={() => { dispatch(closeFormEditRoomInfo()) }}
                >
                    <FontAwesomeIcon
                        className='text-3xl text-rose-500 hover:text-rose-700'
                        icon={faCircleXmark} />
                </button>
            </div>
            <div className='w-11/12 mx-auto'>
                <Form
                    onSubmitCapture={formik.handleSubmit}
                    autoComplete="off"
                    layout='vertical'
                    className='w-full'
                >
                    <h3 className='text-2xl font-bold text-center my-auto'>
                        Cập nhật thông tin phòng
                    </h3>
                    <Form.Item
                        label='Tên phòng'
                    >
                        <Input
                            name='name'
                            onChange={formik.handleChange}
                            value={formik.values.name} />
                    </Form.Item>
                    <Form.Item
                        label='Mô tả phòng'
                    >
                        <TextArea
                            name='description'
                            onChange={formik.handleChange}
                            value={formik.values.description} />
                    </Form.Item>

                    <div className='w-full flex justify-between'>
                        <Form.Item label="Giá thuê">
                            <InputNumber
                                onChange={(value) => { formik.setFieldValue('price', value) }}
                                value={formik.values.price} />
                        </Form.Item>
                        <Form.Item label="Số lượng nhà tắm">
                            <InputNumber
                                onChange={(value) => { formik.setFieldValue('bath', value) }}
                                value={formik.values.bath} />
                        </Form.Item>
                        <Form.Item label="Số lượng phòng">
                            <InputNumber
                                onChange={(value) => { formik.setFieldValue('bedRoom', value) }}
                                value={formik.values.bedRoom} />
                        </Form.Item>
                        <Form.Item label="Năng suất khách phục vụ">
                            <InputNumber
                                onChange={(value) => { formik.setFieldValue('guests', value) }}
                                value={formik.values.guests} />
                        </Form.Item>
                    </div>

                    <div className='w-full grid grid-cols-5 justify-items-center'>
                        <Form.Item label="WIFI" valuePropName="wifi">
                            <Switch
                                onChange={(value) => { formik.setFieldValue('wifi', value) }}
                                checked={formik.values.wifi} />
                        </Form.Item>
                        <Form.Item label="Hồ bơi" valuePropName="pool">
                            <Switch
                                onChange={(value) => { formik.setFieldValue('pool', value) }}
                                checked={formik.values.pool} />
                        </Form.Item>
                        <Form.Item label="Đốt lửa trại" valuePropName="indoorFireplace">
                            <Switch
                                onChange={(value) => { formik.setFieldValue('indoorFireplace', value) }}
                                checked={formik.values.indoorFireplace} />
                        </Form.Item>
                        <Form.Item label="Nhà bếp" valuePropName="kitchen">
                            <Switch
                                onChange={(value) => { formik.setFieldValue('kitchen', value) }}
                                checked={formik.values.kitchen} />
                        </Form.Item>
                        <Form.Item label="TV truyền hình cáp" valuePropName="cableTV">
                            <Switch
                                onChange={(value) => { formik.setFieldValue('cableTV', value) }}
                                checked={formik.values.cableTV} />
                        </Form.Item>
                        <Form.Item label="Máy sấy tóc" valuePropName="dryer">
                            <Switch
                                onChange={(value) => { formik.setFieldValue('dryer', value) }}
                                checked={formik.values.dryer} />
                        </Form.Item>
                        <Form.Item label="Thang máy" valuePropName="elevator">
                            <Switch
                                onChange={(value) => { formik.setFieldValue('elevator', value) }}
                                checked={formik.values.elevator} />
                        </Form.Item>
                        <Form.Item label="GYM" valuePropName="gym">
                            <Switch
                                onChange={(value) => { formik.setFieldValue('gym', value) }}
                                checked={formik.values.gym} />
                        </Form.Item>
                        <Form.Item label="Lò sưởi ấm" valuePropName="heating">
                            <Switch
                                onChange={(value) => { formik.setFieldValue('heating', value) }}
                                checked={formik.values.heating} />
                        </Form.Item>
                        <Form.Item label="Bồn tắm nước nóng" valuePropName="hotTub">
                            <Switch
                                onChange={(value) => { formik.setFieldValue('hotTub', value) }}
                                checked={formik.values.hotTub} />
                        </Form.Item>
                    </div>



                    <div className='w-full flex justify-end mt-5 mb-2'>
                        <button
                            type='submit'
                            className='text-base font-bold py-2 px-4 text-white bg-rose-500 rounded-lg'
                        >
                            Cập nhật
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
