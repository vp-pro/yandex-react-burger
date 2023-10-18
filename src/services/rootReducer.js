import { combineReducers } from 'redux'
import { ingredientsSlice } from './slices/ingredientsSlice'
import { orderSlice } from './slices/orderSlice'
import { userSlice } from './slices/userSlice'

export const rootReducer = combineReducers({
    ingredients: ingredientsSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
})