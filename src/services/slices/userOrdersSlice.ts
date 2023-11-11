import { createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHistoryOrder } from '../../types/common';
import { createAction } from '@reduxjs/toolkit';
import { socketMiddleware } from '../middlewares/socket-middleware';
import { WebsocketStatus } from '../../types/common';

export const wsActions = {
  wsConnect: createAction<string, 'USER_ORDERS_CONNECT'>('USER_ORDERS_CONNECT'),
  wsDisconnect: createAction('USER_ORDERS_DISCONNECT'),
  wsConnecting: createAction('USER_ORDERS_WS_CONNECTING'),
  onOpen: createAction('USER_ORDERS_WS_OPEN'),
  onClose: createAction('USER_ORDERS_WS_CLOSE'),
  onError: createAction<string, 'USER_ORDERS_WS_ERROR'>('USER_ORDERS_WS_ERROR'),
  onMessage: createAction<'USER_ORDERS_WS_MESSAGE'>('USER_ORDERS_WS_MESSAGE'),
  };

interface UserOrdersState {
  status: WebsocketStatus,
  userOrders: IHistoryOrder[];
}

const initialState: UserOrdersState = {
  status: WebsocketStatus.OFFLINE,
  userOrders: [],
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers:{
    setUserOrders: (state, action: PayloadAction<IHistoryOrder[]>) => {
      state.userOrders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(wsActions.wsConnecting, (state) => {
          state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(wsActions.onOpen, (state) => {
          state.status = WebsocketStatus.ONLINE;
        })
        .addCase(wsActions.onClose, (state) => {
          state.status = WebsocketStatus.OFFLINE;
        })
        .addCase(wsActions.onMessage, (state, action: any) => {
            const data = action.payload;
            if (data.success  && data.orders) {
              if (data.orders) {
                state.userOrders = data.orders;
              }
            }
        })
  }
});


export const { setUserOrders } = userOrdersSlice.actions;
export const userOrdersMiddleware = socketMiddleware(wsActions);

