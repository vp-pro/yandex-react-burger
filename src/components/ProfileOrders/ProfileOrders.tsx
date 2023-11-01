import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { IHistoryOrder } from '../../types/common';
import OrderCard from '../OrderCard/OrderCard';
import styles from './ProfileOrders.module.css'

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
    <div className={styles.container}>
      <h1 className={styles.title}>Ваши заказы</h1>
      <ul className={styles.ordersList}>
        {!userOrders ? <h1>Загрузка...</h1> : userOrders.map((order: IHistoryOrder) => (
          <OrderCard key={order._id} {...order} />
        ))}
      </ul>
    </div>
  );
};

export default ProfileOrdersPage;


