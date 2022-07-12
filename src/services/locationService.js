import { httpService } from "./configURL";

export const locationService = {
    createLocation: (data) => {
        return httpService.post(`/api/locations`, data);
    },
    deleteLocation: (locationID) => {
        return httpService.delete(`/api/locations/${locationID}`);
    },
    updateLocationInfo: (locationID, newLocationInfo) => {
        // without images
        return httpService.put(`/api/locations/${locationID}`, newLocationInfo);
    },
    updateLocationImage: () => {
        return null;
    },
    getLocationList: () => {
        return httpService.get(`/api/locations`);
    },
    getLocationInfo: (locationID) => {
        return httpService.get(`/api/locations/${locationID}`);
    },
};
