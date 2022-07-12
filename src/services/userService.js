import { httpService } from "./configURL";

export const userService = {
  getListUser: () => {
    return httpService.get(`/api/users/pagination?skip=0&limit=0`);
  },
  getInfoUser: (id) => {
    return httpService.get(`/api/users/${id}`);
  },
  putInfouser: (id, data) => {
    return httpService.put(`/api/users/${id}`, data);
  },
};
