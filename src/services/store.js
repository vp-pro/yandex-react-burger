import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'

// const preloadedState = {
//   todos: [],
// }

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // devTools: process.env.NODE_ENV !== 'production',
  // preloadedState,
  // enhancers: [customEnhancer],
}) 