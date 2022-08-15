import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { userService } from '../services/userService';

let initialState = {
    dataListUser: null,
    dataSave: null,
    dataListUserAction: null,
    idUserPut: null,
    valueModalEdit: false,
    valueModalAdd: false,
    valueInputSearch: '',
    visible: { id: null, value: false },
};

// Lấy danh sách toàn bộ người dùng
export const getListUser = createAsyncThunk(
    'userSlice/fetchDataListUser',
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
    'userSlice/fetchInfoUser',
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
    'userSlice/fetchPutInfoUser',
    async ({ idUserPut, valueUpdate }, thunkAPI) => {
        try {
            const result = await userService.putInfouser(
                idUserPut,
                valueUpdate
            );
            thunkAPI.dispatch(getListUser());
            message.success('Cập nhật thành công');
            return result.data;
        } catch (errors) {
            message.error(errors.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);

// Xóa người dùng
export const deleteUser = createAsyncThunk(
    'userSlice/fetchDeleteUser',
    async (id, thunkAPI) => {
        try {
            const result = await userService.deleteUser(id);
            thunkAPI.dispatch(getListUser());
            message.success('Xóa thành công');
            return result.data;
        } catch (errors) {
            message.error(errors.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);
// Thêm người dùng (vai trò quản trị viên)
export const postAddUser = createAsyncThunk(
    'userSlice/fetchAddUser',
    async (data, thunkAPI) => {
        try {
            const result = await userService.postAddUser(data);
            thunkAPI.dispatch(getListUser());
            message.success('Thêm quản trị viên thành công');
            return result.data;
        } catch (errors) {
            message.error(errors.response.data.message);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        // Set tắt mở của modal chỉnh sửa
        openCloseModalEdit: (state, { payload }) => {
            state.valueModalEdit = payload;
        },
        // Set tắt mở của modal thêm
        openCloseModalAdd: (state, { payload }) => {
            state.valueModalAdd = payload;
        },
        // lấy input người dùng để cập nhật
        getIdUserPut: (state, { payload }) => {
            state.idUserPut = payload;
        },
        // xử lý tìm kiếm người dùng bằng email
        handleValueInputSearch: (state, { payload }) => {
            state.valueInputSearch = payload;
            let dataUpdate = state.dataSave.filter((item) => {
                if (typeof item.email === 'string') {
                    if (
                        item.email
                            .trim()
                            .toUpperCase()
                            .includes(payload.trim().toUpperCase())
                    ) {
                        return item;
                    }
                }
            });
            state.dataListUser = dataUpdate;
        },
        handleChangeVisible: (state, { payload }) => {
            state.visible = payload;
        },
    },
    extraReducers: {
        [getListUser.fulfilled]: (state, { payload }) => {
            state.dataListUser = payload;
            state.dataSave = payload;
        },
        [getListUser.pending]: (state) => {
            state.dataListUser = [];
            state.dataSave = [];
        },
        [getInfoUser.fulfilled]: (state, { payload }) => {
            state.dataListUserAction = payload;
        },
        [getInfoUser.pending]: (state) => {
            state.dataListUserAction = null;
        },
        [putInfoUser.fulfilled]: (state) => {
            state.valueModalEdit = false;
            state.valueInputSearch = '';
        },
        [putInfoUser.pending]: (state) => {
            state.valueModalEdit = true;
        },
        [postAddUser.fulfilled]: (state) => {
            state.valueModalAdd = false;
            state.valueInputSearch = '';
        },
        [deleteUser.fulfilled]: (state) => {
            state.valueInputSearch = '';
        },
        [postAddUser.rejected]: (state) => {
            state.valueModalAdd = true;
        },
        [postAddUser.pending]: (state) => {
            state.valueModalAdd = true;
        },
    },
});

export const {
    openCloseModalAdd,
    openCloseModalEdit,
    getIdUserPut,
    handleValueInputSearch,
    handleChangeVisible,
} = userSlice.actions;

export default userSlice.reducer;
