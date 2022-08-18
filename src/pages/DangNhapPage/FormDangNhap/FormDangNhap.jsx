import { Form, Input, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { postDataDangNhap } from '../../../redux/authSlice';

export default function FormDangNhap() {
    const dispatch = useDispatch();

    const validateMessages = {
        required: '${label} không được để trống',
        whitespace: '${label} không được để trống',
        types: {
            email: '${label} không hợp lệ',
            number: '${label} không hợp lệ',
        },
    };

    const onFinish = (values) => {
        dispatch(postDataDangNhap(values));
    };

    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo);
    };

    return (
        <div className="truncate border border-black rounded-xl">
            <div className="flex items-center justify-center h-16 text-xl font-bold uppercase border-b px-7">
                Đăng nhập
            </div>
            <div className="p-7">
                <div className="mb-4 text-lg font-medium">
                    Chào mừng bạn đến với Airbnb
                </div>
                <Form
                    className="font-medium"
                    labelCol={{ span: 5 }}
                    style={{ width: '500px' }}
                    validateMessages={validateMessages}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item className="truncate" style={{ margin: '0' }}>
                        <button
                            className="p-3 relative text-white w-full rounded-lg font-medium uppercase text-lg after:content-[''] after:w-full after:bg-white after:absolute after:top-full after:h-full after:left-0 after:text-white after:rounded-lg after:duration-300 after:hover:-translate-y-full after:hover:bg-[#ff5a5f] after:mix-blend-screen"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle at center,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%, #BD1E59 75%,#BD1E59 100%',
                            }}
                        >
                            <span>Đăng nhập</span>
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
