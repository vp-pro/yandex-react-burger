import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url, request } from '../../utils/api'
import {IIngredient} from '../../types/common'


interface IOrderState {
  ingredients: IIngredient[];
  bun: IIngredient | null;
  orderNumber: number | null;
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

const initialState: IOrderState = {
  ingredients: [],
  bun: null,
  orderNumber: null,
  totalPrice: 0,
  loading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    setBun: (state, action) => {
      const selectedBun = action.payload;
      state.bun = selectedBun;
      state.totalPrice = calculateTotalPrice(state);
    },
    addIngredient: (state, action) => {
      const ingredientToAdd = action.payload.ingredient;
      const id = action.payload.uuid;

      let updatedIngredient = { ...ingredientToAdd, id };
      state.ingredients.push(updatedIngredient);

      state.totalPrice = calculateTotalPrice(state);
    },
    removeIngredient: (state, action) => {
      const id = action.payload;
      state.ingredients = state.ingredients.filter((ingredient) => ingredient._id !== id)
      state.totalPrice = calculateTotalPrice(state);
    },
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
      state.totalPrice = calculateTotalPrice(state)
    },
    cleanOrder: (state) => {
      state.orderNumber = null
      state.ingredients = []
      state.bun = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderNumber.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const orderNumber = action.payload;
      state.orderNumber = orderNumber;
    });

    builder.addCase(fetchOrderNumber.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchOrderNumber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  }
})

export const fetchOrderNumber = createAsyncThunk('order/fetchOrderNumber',
  async (_, { getState }) => {
    try {
      const state = getState() as {order : IOrderState}
      const ids = state.order.ingredients.map(ingredient => ingredient._id)
      if (state.order.bun) {
        ids.push(state.order.bun._id);
      }      
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: ids
        })
      };
      const response = await request(url.orders, requestOptions);
      const orderNumber = response.order.number

      return orderNumber;
    } catch (error: any) {
      throw new Error(error.message)
    }
  })

  const calculateTotalPrice = (state: IOrderState) => {
    const totalPrice =
      state.ingredients.reduce((acc: number, ingredient: IIngredient) => acc + ingredient.price, 0) +
      (state.bun ? state.bun.price * 2 : 0);
    return totalPrice;
  };

export const { setBun, addIngredient, removeIngredient, setIngredients, cleanOrder } = orderSlice.actions;


export const clearOrder= () => async (dispatch: any) => {
  try {
    dispatch(cleanOrder());
  } catch (error) {
    console.error("Error fetching and setting ingredients:", error);
  }
};