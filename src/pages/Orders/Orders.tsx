import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserOrders, UserOrder } from '../slices/userOrdersSlice';
import { RootState } from '../store/rootReducer';

const OrdersPage: React.FC = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector((state: RootState) => state.userOrders.userOrders);

  useEffect(() => {
    dispatch({ type: 'websocket/connect', payload: { endpoint: 'orders' } });

    return () => {
      dispatch({ type: 'websocket/disconnect', payload: { endpoint: 'orders' } });
    };
  }, [dispatch]);

  useEffect(() => {
    if (userOrders.length === 0) {
      dispatch({ type: 'websocket/send', payload: { endpoint: 'orders', data: 'your_request_here' } });
    }
  }, [dispatch, userOrders]);

  return (
    <div>
      <h1>Your Orders</h1>
      <ul>
        {userOrders.map((order: UserOrder) => (
          <li key={order._id}>{order.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
