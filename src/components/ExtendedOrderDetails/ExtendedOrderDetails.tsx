import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IHistoryOrder, IIngredient } from '../../types/common';
import styles from'./ExtendedOrderDetails.module.css'
import { useAppSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { request, url } from '../../utils/api';
import { formatRelativeDateTime } from '../../utils/functions';

interface IngredientProps {
  ingredient: IIngredient;
  number: number;
}
const IngredientRow: React.FC<IngredientProps> = ({ ingredient, number }) => {
  return <div className={styles.ingredientRowContainer}>
    <div className={styles.iconContainer}>
      <img className={styles.icon} src={ingredient.image_mobile} alt={ingredient.name}/>
    </div>
    <p className={styles.ingredientName}>{ingredient.name}</p>
    <p className={styles.ingredientNumber}>{number}</p>
    <p className={styles.ingredientNumber}>{' X '}</p>
    <div className={styles.price}>
      {ingredient.price}
      <CurrencyIcon type='primary'/>
    </div>

  </div>
}

function countIngredientOccurrences(ingredients: string[]): Record<string, number> {
  const ingredientCounts: Record<string, number> = {};
  ingredients.forEach((ingredientId: string) => {
    ingredientCounts[ingredientId] = (ingredientCounts[ingredientId] || 0) + 1;
  });
  return ingredientCounts;
}

function mapResponseToHistoryOrder<IHistoryOrder>(responseData: any) {
  return {
    _id: responseData._id,
    ingredients: responseData.ingredients,
    status: responseData.status,
    name: responseData.name,
    createdAt: responseData.createdAt,
    updatedAt: responseData.updatedAt,
    number: responseData.number,
  };
}


const ProfileOrderDetailsPage: React.FC = () => {
  const [order, setOrder] = useState<IHistoryOrder | undefined>(undefined);
  const [fetchAttempted, setFetchAttempted] = useState(false); // New state variable
  const [ingredientOccurrences, setIngredientOccurrences] = useState<Record<string, number>>()

  const ingredientList = useAppSelector((state) => state.ingredients.ingredients);
  const { id } = useParams();
  const orders = useAppSelector((state) => state.orders.orders);
  const userOrders = useAppSelector((state) => state.userOrders.userOrders);

  const checkOrder = orders.find((order: IHistoryOrder) => order._id === id);
  const checkUserOrder = userOrders.find((order: IHistoryOrder) => order._id === id);

  const [colorStyleClass, setColorStyleClass] = useState<string>('')
  const [statusText, setStatusText] = useState<string>('')

  const [httpFetchError, setHttpFetchError] = useState<string>('')

  useEffect(() => {
    if (!fetchAttempted && checkOrder === undefined && checkUserOrder === undefined) {
      const fetchOrder = async () => {
        try {
          const response = await request(url.orders + '/' + id);
          if (response.success) {
            const data = response.orders[0]
            setOrder(mapResponseToHistoryOrder(data));
          } else {
            console.error('Request failed with status:', response.status);
          }
        } catch (error) {
          setHttpFetchError('Упс, что-то пошло не так!')
          console.error('Error fetching order:', error);
        } finally {
          setFetchAttempted(true);
        }
      };

      fetchOrder();
    }
  }, [id, fetchAttempted, checkOrder, checkUserOrder]);

  useEffect(()=> {
    if (order) {
      setIngredientOccurrences(countIngredientOccurrences(order.ingredients));
      switch (order.status) {
        case 'done':
          setColorStyleClass(styles.statusDone)
          setStatusText('Выполнен')
          break;
        case 'pending':
          setColorStyleClass(styles.statusPending)
          setStatusText('Готовится')
          break;
        case 'created':
          setColorStyleClass(styles.statusCreated)
          setStatusText('Создан')
          break;
        default:
          break;
      }
    }
  },[order])

  return (
    <>
      {order &&
          <div className={styles.container}>
            <p className={styles.orderNumber}>#{order.number}</p>
            <p className={styles.title}>{order.name}</p>
            {statusText &&<p className={styles.status + " "+ colorStyleClass}>{statusText}</p>}
            <p className={styles.compositionText}>Состав:</p>
            <div className={styles.ingredientList}>

            {ingredientOccurrences && Object.keys(ingredientOccurrences).map((ingredientId) => {
              const ingr = ingredientList.find((ingr) => ingr._id === ingredientId);
              const count = ingredientOccurrences[ingredientId];
              if (ingr) {
                return <IngredientRow key={ingredientId} ingredient={ingr} number={count} />;
              } else {
                return <p key={ingredientId}>Ingredient not found</p>;
              }
            })}
          </div>
            <div className={styles.footer}>
              <p className={styles.date}>{formatRelativeDateTime(order.createdAt)}</p>
              <div className={styles.price + ' ' + styles.totalPrice}>
                {order.ingredients.reduce((sum, element)=> {
                  const foundIngredient = ingredientList.find(ingr=> ingr._id === element)
                  return foundIngredient?  sum + foundIngredient?.price : sum
                },0)}
                <CurrencyIcon type='primary'/>

              </div>
            </div>
          </div>
        }
        {!order && !httpFetchError &&
        <h1 className={styles.loadingText}>
          Loading...
          </h1>}

          {!order && httpFetchError &&
        <h1 className={styles.loadingText}>{httpFetchError}</h1>}

      </>
  );
};

export default ProfileOrderDetailsPage;


