import { combineReducers } from 'redux'
import { ingredientsSlice } from './slices/ingredientsSlice'
import { orderSlice } from './slices/orderSlice'
import { userSlice } from './slices/userSlice'
import { loginSlice } from './slices/loginSlice'
import { registerSlice } from './slices/registerSlice'
import { authSlice } from './slices/authSlice'

export const rootReducer = combineReducers({
    ingredients: ingredientsSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    auth: authSlice.reducer
})