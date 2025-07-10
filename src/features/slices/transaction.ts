import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ITransaction {
  totalPayable: number | null;
  unit: number | null;
}

const initialState: ITransaction = {
  totalPayable: null,
  unit: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTotalPayable: (state, action: PayloadAction<ITransaction>) => {
      state.totalPayable = action.payload.totalPayable;
      state.unit = action.payload.unit;
    },
  },
});

export const { setTotalPayable } = transactionSlice.actions;
export default transactionSlice.reducer;
