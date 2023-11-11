// // websocketMiddleware.ts
// import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
// import { setOrders, setTotals } from '../slices/ordersSlice';
// import { setUserOrders } from '../slices/userOrdersSlice';

// interface WebSocketAction {
//   type: string;
//   payload: any;
// }

// const connections: Record<string, WebSocket | null> = {};

// const getAccessToken = () => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     return token.replace(/^Bearer\s+/i, '').trim();
//   }
//   return '';
// };

// const getWebSocketForEndpoint = (endpoint: string, dispatch: Dispatch) => {
//   if (!connections[endpoint]) {

//     const accessToken = getAccessToken();
//     const url = `wss://norma.nomoreparties.space/${endpoint}?token=${accessToken}`;

//     connections[endpoint] = new WebSocket(url);
//     connections[endpoint]?.addEventListener('message', (event) => {
//       const data = JSON.parse(event.data);
//       if (data.success) {
//         if (endpoint === 'orders/all') {
//           if (data.orders) {
//             dispatch(setOrders(data.orders));
//             dispatch(setTotals({total: data.total, totalToday: data.totalToday}))
//           }
//         } else if (endpoint === 'orders') {
//           if (data.orders) {
//             dispatch(setUserOrders(data.orders));
//           }
//         }
//       }
//     });

//     connections[endpoint]?.addEventListener('close', () => {
//       connections[endpoint] = null;
//     });
//   }
//   connections[endpoint]?.addEventListener('error', (error) => {
//     console.error('WebSocket Error:', error);
//   });

//   return connections[endpoint];
// };

// const websocketMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (
//   action: WebSocketAction
// ) => {
//   const { type, payload } = action;

//   if (type === 'websocket/connect') {
//     const endpoint = payload.endpoint;
//     getWebSocketForEndpoint(endpoint, store.dispatch); // Pass the dispatch function
//   } else if (type === 'websocket/send') {
//     const { endpoint, data } = payload;
//     const socket = getWebSocketForEndpoint(endpoint, store.dispatch); // Pass the dispatch function
//     if (socket) {
//       socket.send(JSON.stringify(data));
//     }
//   } else if (type === 'websocket/disconnect') {
//     const endpoint = payload.endpoint;
//     const socket = connections[endpoint];
//     if (socket) {
//       socket.close();
//       connections[endpoint] = null;
//     }
//   }

//   return next(action);
// };

// export default websocketMiddleware;

import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { RootState } from '../store';

export type TwsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsSendMessage?: ActionCreatorWithPayload<any>,
    wsConnecting: ActionCreatorWithoutPayload,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>,
}

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
    return (store) => {
      let socket: WebSocket | null = null;
      let isConnected = false;
      let reconnectTimer = 0;
      let url = '';

      return next => action => {
        const { dispatch } = store;
        const { wsConnect, wsDisconnect, wsSendMessage, onOpen,
          onClose, onError, onMessage, wsConnecting } = wsActions;

        if (wsConnect.match(action)) {
          console.log('connect')
          url = action.payload;
          socket = new WebSocket(url);
          isConnected = true;
          dispatch(wsConnecting());
        }

        if (socket) {
          socket.onopen = () => {
            dispatch(onOpen());
          };

          socket.onerror = err  => {
            console.log('error')
          };

          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch(onMessage(parsedData));
          };

          socket.onclose = event => {
            if (event.code !== 1000) {
              console.log('error')
              dispatch(onError(event.code.toString()));
            }
            console.log('close')
            dispatch(onClose());

            if (isConnected) {
              dispatch(wsConnecting());
              reconnectTimer = window.setTimeout(() => {
                dispatch(wsConnect(url));
              }, 3000)
            }

          };

          if (wsSendMessage && wsSendMessage.match(action)) {
            console.log('send')
            socket.send(JSON.stringify(action.payload));
          }

          if (wsDisconnect.match(action)) {
            console.log('disconnect')
            clearTimeout(reconnectTimer)
            isConnected = false;
            reconnectTimer = 0;
            socket.close();
            dispatch(onClose());
          }
        }

        next(action);
      };
    };
  };
