import { combineReducers } from 'redux'
import { ingredientsSlice } from './slices/ingredientsSlice'
import { orderSlice } from './slices/orderSlice'
import { userSlice } from './slices/userSlice'
import { ordersSlice } from './slices/ordersSlice'

export const rootReducer = combineReducers({
    ingredients: ingredientsSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
    orders: ordersSlice.reducer
})
