// OrdersComponent.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../services/slices/ordersSlice";

const FeedPage: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: any) => state.orders.orders);

  useEffect(() => {
    dispatch({ type: "websocket/connect", payload: { url: "wss://norma.nomoreparties.space/orders/all" }});

    return () => {
      dispatch({ type: "websocket/disconnect" });
    };
  }, [dispatch]);

  useEffect(() => {
    if (orders.length === 0) {
      // Send a request to get the list of orders when connected
      dispatch({ type: "websocket/send", payload: { } });
    }
  }, [dispatch, orders]);

  return (
    <div>
      <h1>List of Orders</h1>
      <ul>
        {orders.map((order: any) => (
          <li key={order.id}>{order.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeedPage;
