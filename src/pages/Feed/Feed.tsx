import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { IHistoryOrder } from "../../types/common";
import OrderCard from "../../components/OrderCard/OrderCard";
import styles from './Feed.module.css'
import Layout from "../../components/PageLayout/PageLayout";

const FeedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);
  const total = useAppSelector((state) => state.orders.total);
  const totalToday = useAppSelector((state) => state.orders.totalToday);

  useEffect(() => {
    dispatch({ type: 'websocket/connect', payload: { endpoint: 'orders/all', addToken: false }});

    return () => {
      dispatch({ type: 'websocket/disconnect',  payload: { endpoint: 'orders/all' } });
    };
  }, [dispatch]);

  return (
    <section className={styles.mainContainer}>
      <h1 className={styles.header}>Лента заказов</h1>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          {orders.map((order: IHistoryOrder) => (
            <OrderCard  key={order._id} {...order}/>
          ))}
        </div>
        <section  className={styles.rightSection}>
          <div className={styles.ordersLists}>
            <div className={styles.orderList}>
            <p className={styles.miniTitle}>Готовы:</p>
            {orders
            .filter((order: IHistoryOrder) => order.status === "done")
            .slice(0, 10) // Slice the array to get the first 10 elements
            .map((order: IHistoryOrder) => (
              <p className={styles.orderNumber + ' ' + styles.success} key={order.number}>{order.number}</p>
            ))}
            </div>
            <div className={styles.orderList}>
            <p className={styles.miniTitle}>Готовятся:</p>
            {orders
            .filter((order: IHistoryOrder) => order.status !== "done")
            .slice(0, 10) // Slice the array to get the first 10 elements
            .map((order: IHistoryOrder) => (
              <p className={styles.orderNumber } key={order.number}>{order.number}</p>
            ))}
            </div>
          </div>
          <p className={styles.miniTitle}>Выполнено за все время:</p>
          <p className={styles.total}>{total}</p>
          <p className={styles.miniTitle}>Выполнено за все сегодня:</p>
          <p className={styles.total}>{totalToday}</p>
        </section>
      </div>

    </section>


  );
};

export default FeedPage;
