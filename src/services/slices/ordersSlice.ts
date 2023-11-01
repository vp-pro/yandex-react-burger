import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IHistoryOrder } from "../../types/common";

interface OrdersState {
  orders: IHistoryOrder[];
  total: number | undefined
  totalToday: number | undefined
}

const initialState: OrdersState = {
  orders: [],
  total: undefined,
  totalToday: undefined
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IHistoryOrder[]>) => {
      state.orders = action.payload;
    },
    setTotals: (state, action: PayloadAction<{total: number, totalToday:number}>) =>{
      state.total = action.payload.total
      state.totalToday = action.payload.totalToday
    }
  },
});

export const { setOrders, setTotals } = ordersSlice.actions;
