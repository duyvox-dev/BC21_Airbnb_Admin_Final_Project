import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Input, InputNumber, message, Select, Switch } from 'antd';
import { addRoom, closeFormAddNewRoomInfo } from '../../../redux/roomSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { getLocationList } from '../../../redux/locationSlice';
import _ from 'lodash';

const { TextArea } = Input;

export default function FormAddNewRoom(props) {

    let dispatch = useDispatch();

    //Find location ID according to location name
    useEffect(() => {
        dispatch(getLocationList());
    }, []);
    let locationList = useSelector(state => state.locationSlice.locationList);

    const [locationProvince, setLocationProvince] = useState('');
    const [locationName, setLocationName] = useState('');

    let formik = useFormik({
        initialValues: {
            name: '',
            price: 0,
            bath: 0,
            bedRoom: 0,
            description: '',
            guests: 0,
            locationId: '',
            wifi: false,
            pool: false,
            indoorFireplace: false,
            kitchen: false,
            cableTV: false,
            dryer: false,
            elevator: false,
            gym: false,
            heating: false,
            hotTub: false,
        },
        onSubmit: (values) => {
            if (
                _.trim(values.name) !== '' &&
                _.trim(values.description) !== '' &&
                _.trim(values.locationId) !== '' &&
                values.price > 0 &&
                values.bath > 0 &&
                values.bedRoom > 0 &&
                values.guests > 0
            ) {
                dispatch(addRoom(values));//Call API send new room information to server
            } else {
                message.error('Vui lòng điền đầy đủ thông tin!');
            }
        },
    });

    const renderLocationProvinceList = () => {//Render province list
        return locationList.map((location, index) => {
            return <Select.Option
                key={index}
                value={location.province}>
                {location.province}
            </Select.Option>
        })
    };

    const renderLocationNameList = () => {//Render location name according to chosen province
        return locationList.filter(location => location.province === locationProvince).map((location, index) => {
            return <Select.Option
                key={index}
                value={location.name}>
                {location.name}
            </Select.Option>
        })
    };

    const handleLocationProvinceChange = (value) => {//Get the province selection
        setLocationProvince(value)
    };

    const handleLocationNameChange = (value) => {//Get the location name selection & find locationId
        setLocationName(value)
        let indexLocationName = locationList.findIndex(location => {
            return location.name === value;
        })
        if (indexLocationName !== -1) {
            formik.setFieldValue('locationId', locationList[indexLocationName]._id);
        }
    };

    return (
        <div className='form-edit-room-info-page w-11/12 mx-auto px-2 py-2 bg-white rounded-md'>
            <div className='w-full flex justify-end'>
                <button
                    onClick={() => { dispatch(closeFormAddNewRoomInfo()) }}
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
                        Đăng ký thông tin phòng cho thuê mới
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
                        <Form.Item
                            className='w-5/12'
                            label="Tỉnh thành phòng cho thuê">
                            <Select
                                name='locationProvince'
                                onChange={handleLocationProvinceChange}
                                className='text-left'
                                placeholder='Chọn tỉnh thành'
                            >
                                {renderLocationProvinceList()}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            className='w-5/12'
                            label="Khu vực phòng cho thuê">
                            <Select
                                name='locationName'
                                onChange={handleLocationNameChange}
                                className='text-left'
                                placeholder='Chọn khu vực'
                            >
                                {renderLocationNameList()}
                            </Select>
                        </Form.Item>
                    </div>

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
