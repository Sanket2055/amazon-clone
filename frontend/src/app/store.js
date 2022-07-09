import { configureStore } from "@reduxjs/toolkit";
import amazonReducer from "../features/amazon/amazonSlice";

export const store = configureStore({
  reducer: {
    amazon: amazonReducer,
  },
});
