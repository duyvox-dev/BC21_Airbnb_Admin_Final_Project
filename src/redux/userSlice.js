import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { userService } from "../services/userService";

let initialState = {
  dataListUser: null,
  dataListUserAction: null,
  idUserPut: null,
  valueModal: false,
};

// Lấy danh sách toàn bộ người dùng
export const getListUser = createAsyncThunk(
  "userSlice/fetchDataListUser",
  async (_, thunkAPI) => {
    try {
      const result = await userService.getListUser();
      return result.data;
    } catch {
      return thunkAPI.rejectWithValue();
    }
  }
);

// Lấy thông tin chi tiết người dùng từ id
export const getInfoUser = createAsyncThunk(
  "userSlice/fetchInfoUser",
  async (id, thunkAPI) => {
    try {
      const result = await userService.getInfoUser(id);
      return result.data;
    } catch {
      return thunkAPI.rejectWithValue();
    }
  }
);

// Cập nhật thông tin người dùng
export const putInfoUser = createAsyncThunk(
  "userSlice/fetchPutInfoUser",
  async ({ idUserPut, valueUpdate }, thunkAPI) => {
    console.log(idUserPut, "adasd", valueUpdate);
    try {
      const result = await userService.putInfouser(idUserPut, valueUpdate);
      message.success("Cập nhật thành công");
      return result.data;
    } catch (errors) {
      message.error(errors.response.data.message);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    // Set tắt mở của modal
    openCloseModal: (state, { payload }) => {
      state.valueModal = payload;
    },
    getIdUserPut: (state, { payload }) => {
      state.idUserPut = payload;
    },
  },
  extraReducers: {
    [getListUser.fulfilled]: (state, { payload }) => {
      state.dataListUser = payload;
    },
    [getListUser.pending]: (state) => {
      state.dataListUser = [];
    },
    [getInfoUser.fulfilled]: (state, { payload }) => {
      state.dataListUserAction = payload;
    },
    [getInfoUser.pending]: (state) => {
      state.dataListUserAction = null;
    },
    [putInfoUser.fulfilled]: (state, { payload }) => {
      let dataUpdate = state.dataListUser.map((item) => {
        if (item._id === payload._id) {
          return (item = payload);
        }
        return item;
      });
      state.dataListUser = dataUpdate;
      state.valueModal = false;
    },
    [putInfoUser.pending]: (state, { payload }) => {
      state.valueModal = true;
    },
  },
});

export const { openCloseModal, getIdUserPut } = userSlice.actions;

export default userSlice.reducer;
