import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHistoryOrder, WebsocketStatus } from "../../types/common";
import { socketMiddleware } from "../middlewares/socket-middleware";

export const wsActions = {
  wsConnect: createAction<string, 'FEED_CONNECT'>('FEED_CONNECT'),
  wsDisconnect: createAction('FEED_DISCONNECT'),
  wsConnecting: createAction('FEED_WS_CONNECTING'),
  onOpen: createAction('FEED_WS_OPEN'),
  onClose: createAction('FEED_WS_CLOSE'),
  onError: createAction<string, 'FEED_WS_ERROR'>('FEED_WS_ERROR'),
  onMessage: createAction<'FEED_WS_MESSAGE'>('FEED_WS_MESSAGE'),
  };

interface OrdersState {
  orders: IHistoryOrder[]
  total: number | undefined
  totalToday: number | undefined
  status: WebsocketStatus
}

const initialState: OrdersState = {
  orders: [],
  total: undefined,
  totalToday: undefined,
  status: WebsocketStatus.OFFLINE,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IHistoryOrder[]>) => {
      state.orders = action.payload;
    },
    setTotals: (state, action: PayloadAction<{total: number, totalToday:number}>) =>{
      state.total = action.payload.total
      state.totalToday = action.payload.totalToday
    }
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
              state.orders = data.orders;
              state.total = data.total
              state.totalToday = data.totalToday
            }
        })
    }
  });

export const { setOrders, setTotals } = ordersSlice.actions;
export const feedMiddleware = socketMiddleware(wsActions);
