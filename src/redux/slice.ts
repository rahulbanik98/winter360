import { createSlice } from "@reduxjs/toolkit";

interface User {
  datas: string;
}

interface SliceState {
  weatherData: User[];
}

const initialState: SliceState = {
  weatherData: [],
};

const Slice = createSlice({
  name: "weather360",
  initialState,
  reducers: {
    addData: (state, action) => {
      const data: User = {
        datas: action.payload,
      };
      state.weatherData.push(data);
    },
  },
});

export const { addData } = Slice.actions;
export default Slice.reducer;
