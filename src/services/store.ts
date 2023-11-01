import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type {} from "redux-thunk/extend-redux";
import websocketMiddleware from './middlewares/wsMiddleware'
const  reduxLogger = require('redux-logger')

const logger = reduxLogger.createLogger()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(websocketMiddleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export default store
