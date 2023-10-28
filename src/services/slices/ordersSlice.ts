// ordersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IHistoryOrder } from "../../types/common";

interface OrdersState {
  orders: IHistoryOrder[];
}

const initialState: OrdersState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IHistoryOrder[]>) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = ordersSlice.actions;
