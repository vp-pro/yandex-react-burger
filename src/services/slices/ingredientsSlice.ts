import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {url, request} from '../../utils/api';
import {IIngredient} from '../../types/common'

  interface IngredientsState {
    ingredients: IIngredient[];
    watchingIngredient: IIngredient | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: IngredientsState = {
    ingredients: [],
    watchingIngredient: null,
    loading: false,
    error: null,
  };

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {
        setWatchingIngredient: (state, action) => {
            state.watchingIngredient = action.payload
        },
        removeWatchingIngredient: (state) =>{
            state.watchingIngredient = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchIngredients.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchIngredients.fulfilled, (state, action) => {
            const ingredients = action.payload;
            state.loading = false;
            state.error = null;
            state.ingredients = ingredients;
          })
        .addCase(fetchIngredients.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        })
    }

})

export const {removeWatchingIngredient, setWatchingIngredient} = ingredientsSlice.actions;

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients',
async () => {
        const response = await request(url.ingredients);
        const ingredients = response.data

        return ingredients;
})
