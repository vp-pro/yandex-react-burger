import { userOrdersMiddleware } from './slices/userOrdersSlice';
import { ThunkAction, configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type {} from "redux-thunk/extend-redux";
// import { TUserOrdersActions } from './actions/userOrdersActions';
// import socketMiddleware from './middlewares/socket-middleware'
import { feedMiddleware } from './slices/ordersSlice';
const  reduxLogger = require('redux-logger')

const logger = reduxLogger.createLogger()

export type RootState = ReturnType<typeof rootReducer>

export const middlewares = [logger, userOrdersMiddleware, feedMiddleware]

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(...middlewares),
})


// export type AppActions = TUserOrdersActions;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   AppActions
// >

export type AppDispatch = typeof store.dispatch
// export type AppDispatch<TReturnType = void> = (action: AppActions | AppThunk) => TReturnType;

export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export default store
