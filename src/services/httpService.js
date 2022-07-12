import { store } from "../redux/store";
import axios from "axios";
import { getRequestConfig, getAccessToken } from "./configURL";
import { startLoading, stopLoading } from "../redux/loadingSlice";
export const BASE_URL = process.env.REACT_APP_API_BASE_URL;
let timeRequestMax;

export const httpService = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * timeRequestMax,

    ...getRequestConfig(),
});

//Action can thiệp trước khi gọi request API
httpService.interceptors.request.use(
    function (config) {
        // store.dispatch(startLoading());
        const accessToken = getAccessToken();
        if (accessToken) config.headers.token = accessToken;
        else delete httpService.defaults.headers.common.token;
        return config;
    },
    function (error) {
        // store.dispatch(stopLoading());
        return Promise.reject(error);
    }
);
//Action can thiệp sau khi có request API trả về
httpService.interceptors.response.use(
    function (response) {
        // store.dispatch(stopLoading());
        return response;
    },
    function (error) {
        // store.dispatch(stopLoading());
        return Promise.reject(error);
    }
);
