import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import styles from './ProtectedRouteElement.module.css'

const ProtectedComponent = ({ onlyUnAuth = false, component }) => {
  
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
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

  return component;
};


export const OnlyAuth = ProtectedComponent;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedComponent onlyUnAuth={true} component={component} />
);


ProtectedComponent.propTypes = {
  onlyUnAuth: PropTypes.bool, 
  component: PropTypes.node, 
};

OnlyUnAuth.propTypes = {
  component: PropTypes.node, 
};