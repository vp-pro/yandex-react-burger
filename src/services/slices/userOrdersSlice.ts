// userOrdersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserOrder {
  _id: string; // Replace with the actual ID type if it's not a string
  ingredients: string[]; // Array of ingredient IDs
  status: string; // Status type (e.g., "done")
  number: number; // Order number
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

interface UserOrdersState {
  userOrders: UserOrder[];
}

const initialState: UserOrdersState = {
  userOrders: [],
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    setUserOrders: (state, action: PayloadAction<UserOrder[]>) => {
      state.userOrders = action.payload;
    },
  },
});

export const { setUserOrders } = userOrdersSlice.actions;
export default userOrdersSlice.reducer;
