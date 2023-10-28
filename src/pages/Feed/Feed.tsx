import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { IHistoryOrder } from "../../types/common";
import OrderCard from "../../components/OrderCard/OrderCard";

const FeedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch({ type: 'websocket/connect', payload: { endpoint: 'orders/all', addToken: false }});

    return () => {
      dispatch({ type: 'websocket/disconnect',  payload: { endpoint: 'orders/all' } });
    };
  }, [dispatch]);

  return (
    <div>
      <h1>List of Orders</h1>
      <ul>
        {orders.map((order: IHistoryOrder) => (
          <OrderCard  key={order._id} {...order}/>
        ))}
      </ul>
    </div>
  );
};

export default FeedPage;
