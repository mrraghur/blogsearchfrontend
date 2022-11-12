// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

// create a slice
export const csvSlice = createSlice({
  name: "csv",
  initialState: {
    data: {},
    loading: false,
  },
  reducers: {
    setDatas: (state, action) => {
      state.data = action.payload;
    },
    startLoading: (state, action) => {
      state.loading = true;
    },
    stopLoading: (state, action) => {
      state.loading = false;
    },
  },
});

// export actions
export const { startLoading, stopLoading, setDatas } = csvSlice.actions;

//fetch data from api
export const uploadCsv = (data) => async (dispatch) => {
  dispatch(startLoading());

  console.log(data);

  try {
    // await axios
    //   .post("https://backend.interviewblindspots.com/displaycode/upload/", {
    //     file,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
  } catch (error) {
    return new Error(error.message);
  }

  dispatch(stopLoading());
};

// export reducer
export default csvSlice.reducer;
