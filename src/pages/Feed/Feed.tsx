// OrdersComponent.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order, setOrders } from "../../services/slices/ordersSlice";
import { RootState } from "../../services/store";

const FeedPage: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);

  useEffect(() => {
    dispatch({ type: 'websocket/connect', payload: { url: 'wss://norma.nomoreparties.space/orders/all' }});

    return () => {
      dispatch({ type: 'websocket/disconnect' });
    };
  }, [dispatch]);

  useEffect(() => {
    if (orders.length === 0) {
      // Send a request to get the list of orders when connected
      const websocket = new WebSocket('wss://norma.nomoreparties.space/orders/all');

      websocket.onopen = () => {
        websocket.send('your_request_here'); // Send the request when the WebSocket is open
      };

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        dispatch(setOrders(data.orders)); // Dispatch the "setOrders" action
      };
    }
  }, [dispatch, orders]);
  return (
    <div>
      <h1>List of Orders</h1>
      <ul>
        {orders.map((order: Order) => (
          <>
          <h1>{order.name}</h1>
          <li key={order._id}>{order.createdAt}</li>
          <li key={order._id}>{order.updatedAt}</li>
          <li key={order._id}>{order.status}</li>
          <li key={order._id}>{order.number}</li>

          </>


        ))}
      </ul>
    </div>
  );
};


export default FeedPage;
