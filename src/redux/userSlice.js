import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/userService";

let initialState = {
  dataListUser: null,
};

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

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getListUser.fulfilled]: (state, { payload }) => {
      state.dataListUser = payload;
    },
  },
});

export default userSlice.reducer;
