import { combineReducers } from 'redux'
import { ingredientsSlice } from './slices/ingredientsSlice'
import { orderSlice } from './slices/orderSlice'

export const rootReducer = combineReducers({
    ingredients: ingredientsSlice.reducer,
    order: orderSlice.reducer
})