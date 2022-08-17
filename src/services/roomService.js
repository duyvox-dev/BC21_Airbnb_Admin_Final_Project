import { httpService } from './httpService';

export const roomService = {
    getRoomList: (idLocation = '') => {
        if (idLocation.trim() !== '') {
            return httpService.get(`/api/rooms?locationId=${idLocation}`);
        } else {
            return httpService.get(`/api/rooms`);
        }
    },

    getRoomInfo: (idRoom) => {
        return httpService.get(`/api/rooms/${idRoom}`);
    },

    deleteRoom: (idRoom) => {
        return httpService.delete(`/api/rooms/${idRoom}`);
    },

    createRoom: (dataForm) => {
        return httpService.post(`/api/rooms`, dataForm);
    },

    uploadRoomImage: (idRoom, formData) => {
        return httpService.post(`/api/rooms/upload-image/${idRoom}`, formData);
    },

    upadteRoomInfo: (idRoom, dataForm) => {
        return httpService.put(`/api/rooms/${idRoom}`, dataForm);
    },
};
