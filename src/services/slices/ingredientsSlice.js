import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ingredientsURL} from '../../utils/api.js';
import {setBun} from './orderSlice'
import { useDispatch } from "react-redux";
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
        const response = await fetch(ingredientsURL);
        if (!response.ok) {
            throw new Error('Failed to fetch ingredients');
        }
        const data = await response.json();
        const ingredients = data.data


        return ingredients;
    } catch (error) {
        throw new Error(error.message)
    }
})
