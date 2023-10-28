// ordersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: string;
  title: string;
  // Add other order properties here
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = ordersSlice.actions;




// import { createReducer } from '@reduxjs/toolkit'
// import { createAction } from '@reduxjs/toolkit';

// export type OrdersStore = {
//     status: WebsocketStatus,
//     connectionError: string,
//     table: Orders
// }

// const initialState: OrdersStore = {
//     status: WebsocketStatus.OFFLINE,
//     connectionError: '',
//     table: []
// };

// import {
//   Orders,
//   OrdersActionType,
//   OrdersActions,
//   Insert as OrdersInsertAction,
//   Delete as OrdersDeleteAction,
//   Update as OrdersUpdateAction,
//   Move as OrdersMoveAction,
//   WebsocketStatus
// } from '../../types/orders';


// const insertData = (table: Orders, action: OrdersInsertAction): Orders => {
//   return [
//       ...table.slice(0, action.data.pos),
//       ...action.data.rows,
//       ...table.slice(action.data.pos)
//   ]
// }

// const deleteData = (table: Orders, action: OrdersDeleteAction): Orders => {
//   return table.filter(({id}) => !action.data.includes(id));
// }

// const updateData = (table: Orders, action: OrdersUpdateAction): Orders => {
//   return table.map(row => {
//       const index = action.data.findIndex((updatedRow) => updatedRow.id === row.id);
//       if (index !== -1) {
//           return action.data[index];
//       }
//       return row;
//   });
// }

// const moveData = (prevTable: Orders, action: OrdersMoveAction): Orders => {
//   const table = [...prevTable];
//   action.data.forEach((move) => {
//       table.splice(move.to, 0, table.splice(move.from, 1)[0]);
//   });
//   return table;
// }

// export const OrdersUpdate = (prevTable: Orders, actions: OrdersActions): Orders => {
//   let table = prevTable;
//   actions.forEach((action) => {
//       switch (action.type) {
//           case OrdersActionType.DATA:
//               table = action.data;
//               break;
//           case OrdersActionType.INSERT:
//               table = insertData(table, action);
//               break;
//           case OrdersActionType.DELETE:
//               table = deleteData(table, action);
//               break;
//           case OrdersActionType.UPDATE:
//               table = updateData(table, action);
//               break;
//           case OrdersActionType.MOVE:
//               table = moveData(table, action);
//               break;
//       }
//   });

//   return table;
// }




// export const connect = createAction<string, 'ORDERS_CONNECT'>('ORDERS_CONNECT');
// export const disconnect = createAction('ORDERS_DISCONNECT');
// export const wsConnecting = createAction('ORDERS_WS_CONNECTING');
// export const wsOpen = createAction('ORDERS_WS_OPEN');
// export const wsClose = createAction('ORDERS_WS_CLOSE');
// export const wsMessage = createAction<OrdersActions, 'ORDERS_WS_MESSAGE'>('ORDERS_WS_MESSAGE');
// export const wsError = createAction<string, 'ORDERS_WS_ERROR'>('ORDERS_WS_ERROR');

// export type TOrdersActions = ReturnType<typeof connect>
//                                 | ReturnType<typeof disconnect> 
//                                 | ReturnType<typeof wsConnecting> 
//                                 | ReturnType<typeof wsOpen> 
//                                 | ReturnType<typeof wsClose> 
//                                 | ReturnType<typeof wsMessage> 
//                                 | ReturnType<typeof wsError>;