import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../services/store';
import { IHistoryOrder } from '../../types/common';
import OrderCard from '../OrderCard/OrderCard';
import styles from './ProfileOrders.module.css'
import {wsActions} from '../../services/slices/userOrdersSlice'
import {getAccessToken} from '../../utils/functions';
import { wssUrl } from '../../utils/api';


const ProfileOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userOrders = useAppSelector((state: RootState) => state.userOrders.userOrders);

  useEffect(() => {
    const accessToken = getAccessToken();
    const url = wssUrl.userOrders+'?token='+accessToken;
    dispatch(wsActions.wsConnect(url));
    return () => {
      dispatch(wsActions.wsDisconnect());
    };
  }, [dispatch]);
  return (
    <div className={styles.container}>
      {userOrders.length>1 && <>
        <h1 className={styles.title}>Ваши заказы</h1>
        <div className={styles.ordersList}>
          {!userOrders ? <h1>Загрузка...</h1> : userOrders.slice(0).reverse().map((order) => (
            <OrderCard key={order._id} {...order} />
          ))}
        </div>
      </>}
      {userOrders.length<1 && <p className={styles.loading}>Пока нет заказов...</p>}

    </div>
  );
};

export default ProfileOrdersPage;


