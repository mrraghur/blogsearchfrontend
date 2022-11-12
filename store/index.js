import { configureStore } from "@reduxjs/toolkit";

import csvReducer from "./reducers/csv";

export default configureStore({
  reducer: {
    csv: csvReducer,
  },
});
