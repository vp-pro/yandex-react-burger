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
  // Extract the access token from localStorage
  const token = localStorage.getItem('accessToken');
  if (token) {
    // Remove the 'Bearer ' prefix and any leading/trailing whitespace
    return token.replace(/^Bearer\s+/i, '').trim();
  }
  return '';
};

const getWebSocketForEndpoint = (endpoint: string) => {
  if (!connections[endpoint]) {
    const accessToken = getAccessToken();
    const url = `wss://norma.nomoreparties.space/${endpoint}?token=${accessToken}`;
    connections[endpoint] = new WebSocket(url);

    connections[endpoint].onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.success) {
        if (endpoint === 'orders/all') {
          if (data.orders) {
            store.dispatch(setOrders(data.orders)); // Dispatch the "setOrders" action for ordersSlice
          }
        } else if (endpoint === 'orders') {
          if (data.userOrders) {
            store.dispatch(setUserOrders(data.userOrders)); // Dispatch the "setUserOrders" action for userOrdersSlice
          }
        }
      }
    };

    connections[endpoint].onclose = () => {
      connections[endpoint] = null;
    };
  }
  return connections[endpoint];
};

const websocketMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (
  action: WebSocketAction
) => {
  const { type, payload } = action;

  if (type === 'websocket/connect') {
    const endpoint = payload.endpoint;
    getWebSocketForEndpoint(endpoint);
  } else if (type === 'websocket/send') {
    const { endpoint, data } = payload;
    const socket = getWebSocketForEndpoint(endpoint);
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
