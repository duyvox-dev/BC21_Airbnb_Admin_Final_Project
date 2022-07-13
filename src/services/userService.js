import { httpService } from "./configURL";

export const userService = {
  // Lấy thông tin danh sách người dùng
  getListUser: () => {
    return httpService.get(`/api/users/pagination?skip=0&limit=0`);
  },
  // Lấy thông tin chi tiết người dùng
  getInfoUser: (id) => {
    return httpService.get(`/api/users/${id}`);
  },
  // Cập nhật thông tin người dùng
  putInfouser: (id, data) => {
    return httpService.put(`/api/users/${id}`, data);
  },
  // Xóa người dùng
  deleteUser: (id) => {
    return httpService.delete(`/api/users/${id}`);
  },
  // Thêm quản trị viên
  postAddUser: (data) => {
    return httpService.post(`/api/users`, data);
  },
};
