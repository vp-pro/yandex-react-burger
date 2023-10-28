// userOrdersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHistoryOrder } from '../../types/common';


interface UserOrdersState {
  userOrders: IHistoryOrder[];
}

const initialState: UserOrdersState = {
  userOrders: [],
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    setUserOrders: (state, action: PayloadAction<IHistoryOrder[]>) => {
      state.userOrders = action.payload;
    },
  },
});

export const { setUserOrders } = userOrdersSlice.actions;
