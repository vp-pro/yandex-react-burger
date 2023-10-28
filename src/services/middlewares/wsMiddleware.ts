// websocketMiddleware.ts
import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { setOrders } from '../slices/ordersSlice';
import { setUserOrders } from '../slices/userOrdersSlice';

interface WebSocketAction {
  type: string;
  payload: any;
}

const connections: Record<string, WebSocket | null> = {};

const getAccessToken = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return token.replace(/^Bearer\s+/i, '').trim();
  }
  return '';
};

const getWebSocketForEndpoint = (endpoint: string, dispatch: Dispatch) => {
  if (!connections[endpoint]) {

    const accessToken = getAccessToken();
    const url = `wss://norma.nomoreparties.space/${endpoint}?token=${accessToken}`;
    console.log(url)

    connections[endpoint] = new WebSocket(url);

    connections[endpoint]?.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.success) {
        if (endpoint === 'orders/all') {
          if (data.orders) {
            dispatch(setOrders(data.orders));
          }
        } else if (endpoint === 'orders') {
          console.log(data)
          if (data.orders) {
            dispatch(setUserOrders(data.orders));
          }
        }
      }
    });

    connections[endpoint]?.addEventListener('close', () => {
      connections[endpoint] = null;
    });
  }
  return connections[endpoint];
};

const websocketMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (
  action: WebSocketAction
) => {
  const { type, payload } = action;

  if (type === 'websocket/connect') {
    const endpoint = payload.endpoint;
    getWebSocketForEndpoint(endpoint, store.dispatch); // Pass the dispatch function
  } else if (type === 'websocket/send') {
    const { endpoint, data } = payload;
    const socket = getWebSocketForEndpoint(endpoint, store.dispatch); // Pass the dispatch function
    if (socket) {
      socket.send(JSON.stringify(data));
    }
  } else if (type === 'websocket/disconnect') {
    const endpoint = payload.endpoint;
    const socket = connections[endpoint];
    if (socket) {
      socket.close();
      connections[endpoint] = null;
    }
  }

  return next(action);
};

export default websocketMiddleware;
