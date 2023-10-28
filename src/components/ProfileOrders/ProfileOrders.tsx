import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { IHistoryOrder } from '../../types/common';

const ProfileOrdersPage: React.FC = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector((state: RootState) => state.userOrders.userOrders);

  useEffect(() => {
    dispatch({ type: 'websocket/connect', payload: { endpoint: 'orders' } });

    return () => {
      dispatch({ type: 'websocket/disconnect', payload: { endpoint: 'orders' } });
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Your Orders</h1>
      <ul>
        {userOrders.map((order: IHistoryOrder) => (
          <li key={order._id}>{order.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileOrdersPage;
