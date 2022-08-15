import { httpService } from "./httpService";

export const roomService = {
    getRoomList: (idLocation = "") => {
        if (idLocation.trim() !== "") {
            return httpService.get(`/api/rooms?locationId=${idLocation}`);
        } else {
            return httpService.get(`/api/rooms`);
        }
    },

    getRoomInfo: (indRoom) => {
        return httpService.get(`/api/rooms/${indRoom}`);
    },

    deleteRoom: (indRoom) => {
        return httpService.delete(`/api/rooms/${indRoom}`);
    },

    createRoom: (dataForm) => {
        return httpService.post(`/api/rooms`, dataForm);
    },

    uploadRoomImage: (idRoom, formData) => {
        return httpService.post(`/api/rooms/upload-image/${idRoom}`, formData);
    },

    upadteRoomInfo: (indRoom, dataForm) => {
        return httpService.put(`/api/rooms/${indRoom}`, dataForm);
    },
};
