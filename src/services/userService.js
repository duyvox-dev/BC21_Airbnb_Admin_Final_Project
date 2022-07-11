import { httpService } from "./configURL";

export const userService = {
  getListUser: () => {
    return httpService.get(`/api/users/pagination?skip=0&limit=0`);
  },
};
