import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'

const ProtectedComponent = ({ onlyUnAuth = false, component }) => {
  
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return <div>Please, wait while wi check your authentication</div>;
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

ProtectedComponent.propTypes = {
  onlyUnAuth: PropTypes.bool, // Whether the route is for unauthenticated users
  component: PropTypes.node, // The component to render if authentication checks pass
};

OnlyUnAuth.propTypes = {
  component: PropTypes.node, // The component to render for unauthenticated users
};

export const OnlyAuth = ProtectedComponent;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedComponent onlyUnAuth={true} component={component} />
);
