import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../services/store';
import { IHistoryOrder } from '../../types/common';
import OrderCard from '../OrderCard/OrderCard';
import styles from './ProfileOrders.module.css'

const ProfileOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userOrders = useAppSelector((state: RootState) => state.userOrders.userOrders);

  useEffect(() => {
    dispatch({ type: 'websocket/connect', payload: { endpoint: 'orders' } });

    return () => {
      dispatch({ type: 'websocket/disconnect', payload: { endpoint: 'orders' } });
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {userOrders.length>1 && <>
        <h1 className={styles.title}>Ваши заказы</h1>
        <ul className={styles.ordersList}>
          {!userOrders ? <h1>Загрузка...</h1> : userOrders.map((order: IHistoryOrder) => (
            <OrderCard key={order._id} {...order} />
          ))}
        </ul>
      </>}
      {userOrders.length<1 && <p className={styles.loading}>Пока нет заказов...</p>}

    </div>
  );
};

export default ProfileOrdersPage;


