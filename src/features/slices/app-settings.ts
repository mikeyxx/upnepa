import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AppSettings = {
  isThemeDark: boolean;
  isFirstTime: boolean;
};

export const initialState: AppSettings = {
  isThemeDark: false,
  isFirstTime: true,
};

const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isThemeDark = action.payload;
    },
    toggleTheme: (state) => {
      state.isThemeDark = !state.isThemeDark;
    },
  },
});

export const { setTheme, toggleTheme } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
