import { localStorageService } from "./localService";
export const TOKEN_CYBERSOFT = process.env.REACT_APP_CYBERSOFT_TOKEN;

export const getAccessToken = () => {
    let adminLogin = localStorageService.getAdminLocal();
    if (adminLogin) {
        return adminLogin.accessToken;
    } else {
        return null;
    }
};
export const getRequestConfig = () => {
    const config = {
        headers: {
            tokenByClass: TOKEN_CYBERSOFT,
        },
    };
    const accessToken = getAccessToken();
    if (accessToken) {
        config.headers.token = accessToken;
    }
    return config;
};
