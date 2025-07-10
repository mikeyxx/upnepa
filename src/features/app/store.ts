import { configureStore } from "@reduxjs/toolkit";
import appSettingsReducer from "../slices/app-settings.ts";
import authReducer from "../slices/auth.ts";
import transactionReducer from "../slices/transaction.ts";

export const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
    auth: authReducer,
    totalAmountPayable: transactionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
