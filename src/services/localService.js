const ADMIN_INFO = "ADMIN_INFO";

export const localStorageService = {
  setAdminLocal: (data) => {
    let dataJson = JSON.stringify(data);
    localStorage.setItem(ADMIN_INFO, dataJson);
  },
  getAdminLocal: () => {
    let dataJson = localStorage.getItem(ADMIN_INFO);
    if (dataJson) {
      return JSON.parse(dataJson);
    }
    return null;
  },
  removeAdminLocal: () => {
    let dataJson = localStorage.getItem(ADMIN_INFO);
    if (dataJson) {
      localStorage.removeItem(ADMIN_INFO);
    }
  },
};
