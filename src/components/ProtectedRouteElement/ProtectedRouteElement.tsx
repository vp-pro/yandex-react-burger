import { Navigate, useLocation } from "react-router-dom";
import styles from './ProtectedRouteElement.module.css'
import { useAppSelector } from "../../services/store";
import React from "react";

interface IProtectedComponent {
  onlyUnAuth: boolean;
  component: React.ReactNode;
}
const ProtectedComponent: React.FC <IProtectedComponent> = ({ onlyUnAuth = false, component }) => {
  
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
  const user = useAppSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return <div className={styles.checkingBox}>Loading</div>;
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return <>{component}</>;
};


export const OnlyAuth = ProtectedComponent;

export const OnlyUnAuth: React.FC<{component: React.ReactNode}> = ({ component }) => (
  <ProtectedComponent onlyUnAuth={true} component={component} />
);
