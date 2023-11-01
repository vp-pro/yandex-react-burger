import styles from'./OrderCard.module.css'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { IHistoryOrder } from '../../types/common'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import Modal from '../Modal/Modal';
import ExtendedOrderDetails from '../ExtendedOrderDetails/ExtendedOrderDetails';
import { Link } from 'react-router-dom';

import { formatRelativeDateTime } from '../../utils/functions';

const OrderCard: React.FC<IHistoryOrder > = ( order) => {
  const ingredientList = useAppSelector((state) => state.ingredients.ingredients);
  const location = useLocation();

  const match = useMatch('/feed/*')
  const to = match ? '/feed/' : '/profile/orders/'

  let colorStyleClass
  let statusText
  switch (order.status) {
    case 'done':
      colorStyleClass = styles.statusDone
      statusText = 'Выполнен'
      break;
    case 'pending':
      colorStyleClass = styles.statusPending
      statusText = 'Готовится'
      break;
    case 'created':
      colorStyleClass = styles.statusCreated
      statusText = 'Создан'
      break;
    default:
      break;
  }
  return (
    <Link
    key={order.number}
    // Тут мы формируем динамический путь для нашего ингредиента
    to={to+`${order.number}`}
    // а также сохраняем в свойство background роут,
    // на котором была открыта наша модалка
    state={{ background: location }}
    // className={styles.link}
    style={{ textDecoration: 'none', color: 'inherit' }}
  >
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.headerOrderNumber}>#{order.number}</p>
        <p className={styles.headerDate}>{formatRelativeDateTime(order.createdAt)}</p>
      </div>
      <p className={styles.headerText}>{order.name}</p>
      {!match && <p className={styles.status + " "+ colorStyleClass}>{statusText}</p>}
      <div className={styles.footer}>
        <div className={styles.iconArray}>
          {
            order.ingredients.map((ingredient, index) => {
              // Assuming you have access to the total number of ingredients
              const totalIngredients = order.ingredients.length;
              const foundIngredient = ingredientList.find(element => element._id === ingredient);

              if (index < 6) {
                return (
                  <div key={index} className={styles.iconContainer}>
                    <img className={styles.icon} src={foundIngredient?.image_mobile} alt={foundIngredient?.name} />
                  </div>
                );
              } else if (index === 6) {
                // Render the 6th element with a count of remaining ingredients
                const remainingIngredients = totalIngredients - 6;
                return (
                  <div key="remaining" className={styles.lastIconContainer}>
                    <img className={styles.lastIcon} src={foundIngredient?.image_mobile} alt={foundIngredient?.name} />
                    <p className={styles.remainingIngredientsText}>{`+${remainingIngredients}`}</p>
                  </div>
                );
              }
              return null; // Skip rendering for elements beyond the 6th element
            })
          }
        </div>
        <div className={styles.priceContainer}>
          <p className={styles.footerPrice}>{
          order.ingredients.reduce((sum, ingredient) => {
            const foundIngredient = ingredientList.find(element => element._id === ingredient);
            return sum + (foundIngredient?.price ?? 0);
          }, 0)
          }
          </p>
          <div className={styles.currencyIconContainer}>
            <CurrencyIcon type='primary'/>
          </div>
        </div>
      </div>
    </div>
  </Link>

  );
}

export default OrderCard




