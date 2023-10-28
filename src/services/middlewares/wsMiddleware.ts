// websocketMiddleware.ts
import { Middleware, MiddlewareAPI, Dispatch } from "redux";

interface WebSocketAction {
  type: string;
  payload: any;
}

let socket: WebSocket | null = null;

const websocketMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (
  action: WebSocketAction
) => {
  const { type, payload } = action;

  if (type === "websocket/connect") {
    if (socket) socket.close();
    socket = new WebSocket(payload.url);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      store.dispatch({ type: "websocket/message", payload: data });
    };

    socket.onclose = () => {
      store.dispatch({ type: "websocket/disconnect" });
    };
  } else if (type === "websocket/send" && socket) {
    socket.send(JSON.stringify(payload));
  } else if (type === "websocket/disconnect" && socket) {
    socket.close();
    socket = null;
  }

  return next(action);
};

export default websocketMiddleware;
