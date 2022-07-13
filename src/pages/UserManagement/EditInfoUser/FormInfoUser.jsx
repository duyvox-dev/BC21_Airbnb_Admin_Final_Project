import React from "react";
import { Form, Input, DatePicker, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { putInfoUser } from "../../../redux/userSlice";
import moment from "moment";

const { Option } = Select;

export default function FormInfoUser() {
  const { dataListUserAction } = useSelector((state) => state.userSlice);
  const { idUserPut } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  const validateMessages = {
    required: "${label} không được để trống",
    whitespace: "${label} không được để trống",
    types: {
      email: "${label} không hợp lệ",
      number: "${label} không hợp lệ",
    },
  };

  const onFinish = (values) => {
    let valueUpdate = {
      ...values,
      birthday: values["birthday"].format("YYYY/MM/DD"),
    };
    dispatch(putInfoUser({ idUserPut, valueUpdate }));
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Sửa thông tin thất bại, vui lòng kiểm tra lại thông tin");
  };

  return (
    <div className="rounded-xl">
      <div>
        <Form
          className="font-medium"
          labelCol={{ span: 7 }}
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
            initialValue={dataListUserAction?.name}
            label="Họ tên"
            name="name"
            hasFeedback
            rules={[
              {
                required: true,
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={dataListUserAction?.email}
            label="Email"
            name="email"
            hasFeedback
            rules={[
              {
                required: true,
                type: "email",
                whitespace: true,
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
                whitespace: true,
              },
              {
                min: 6,
                message: "Mật khẩu không được ít hơn 6 chữ số hoặc ký tự",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Nhập lại mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không trùng khớp"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            initialValue={dataListUserAction?.phone}
            label="Số điện thoại"
            name="phone"
            hasFeedback
            rules={[
              {
                required: true,
              },
              {
                message: "Số điện thoại không hợp lệ",
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={
              dataListUserAction?.birthday
                ? moment(dataListUserAction?.birthday, "YYYY-MM-DD")
                : ""
            }
            label="Ngày sinh"
            hasFeedback
            name="birthday"
            rules={[{ required: true, type: "object" }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="Lựa chọn ngày tháng năm sinh"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            initialValue={dataListUserAction?.gender}
            name="gender"
            label="Giới tính"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              value={dataListUserAction?.gender}
              placeholder="Lựa chọn giới tính"
            >
              <Option value={true}>Nam</Option>
              <Option value={false}>Nữ</Option>
            </Select>
          </Form.Item>
          <Form.Item
            initialValue={dataListUserAction?.address}
            name="address"
            hasFeedback
            label="Địa chỉ"
            rules={[{ required: true, whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={dataListUserAction?.type}
            name="type"
            label="Mã loại"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              <Option value="ADMIN">ADMIN</Option>
              <Option value="CLIENT">CLIENT</Option>
            </Select>
          </Form.Item>
          <Form.Item className="truncate" style={{ margin: "0" }}>
            <button
              className="p-3 relative text-white w-full rounded-lg font-medium uppercase text-lg after:content-[''] after:w-full after:bg-white after:absolute after:top-full after:h-full after:left-0 after:text-white after:rounded-lg after:duration-300 after:hover:-translate-y-full after:hover:bg-[#ff5a5f] after:mix-blend-screen"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%, #BD1E59 75%,#BD1E59 100%",
              }}
            >
              <span>Cập nhật</span>
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
