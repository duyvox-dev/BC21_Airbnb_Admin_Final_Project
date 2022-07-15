import { httpService } from "./httpService";

export const roomService = {
    getRoomList: (idViTri = "") => {
        if (idViTri.trim() !== "") {
            return httpService.get(`/api/rooms?locationId=${idViTri}`);
        } else {
            return httpService.get(`/api/rooms`);
        }
    },

    getRoomInfo: (idPhong) => {
        return httpService.get(`/api/rooms/${idPhong}`);
    },

    deleteRoom: (idPhong) => {
        return httpService.delete(`/api/rooms/${idPhong}`);
    },

    createRoom: (dataForm) => {
        return httpService.post(`/api/rooms`, dataForm);
    },

    uploadRoomImage: (idPhong, dataForm) => {
        return httpService.post(`/api/rooms/upload-image/${idPhong}`, dataForm);
    },

    upadteRoomInfo: (idPhong, dataForm) => {
        return httpService.put(`/api/rooms${idPhong}`, dataForm);
    },
};
