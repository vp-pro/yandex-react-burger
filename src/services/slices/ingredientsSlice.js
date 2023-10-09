import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {url, request} from '../../utils/api.js';

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        ingredients: [],
        watchingIngredient: null,
        loading: false,
        error: null
    },
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
            state.error = action.error.message;
        })
    }

})

export const {removeWatchingIngredient, setWatchingIngredient} = ingredientsSlice.actions;

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', 
async () => {
    try {
        const response = await request(url.ingredients);
        const ingredients = response.data

        return ingredients;
    } catch (error) {
        throw new Error(error.message)
    }
})
