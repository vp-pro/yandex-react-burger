import styles from'./OrderCard.module.css'
import { useAppSelector } from '../../services/store'
import { IHistoryOrder } from '../../types/common'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderCard: React.FC<IHistoryOrder > = ( order) => {
  const ingredientList = useAppSelector((state) => state.ingredients.ingredients);

  console.log(ingredientList)
  console.log(order.ingredients)
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.headerOrderNumber}>#{order.number}</p>
        <p className={styles.headerDate}>{formatRelativeDateTime(order.createdAt)}</p>
      </div>
      <h1 className={styles.headerText}>{order.name}</h1>
      <div className={styles.footer}>
        <div className={styles.iconArray}>
          {
            order.ingredients.map(ingredient =>{
              const foundIngredient = ingredientList.find(element => element._id === ingredient)
              return <div className={styles.iconContainer}>
                        <img className={styles.icon} src={foundIngredient?.image_mobile} alt={foundIngredient?.name}/>
                      </div>
                        }
              )
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
          <CurrencyIcon type='primary'/>
        </div>

      </div>
    </div>
  );
}

export default OrderCard



function formatRelativeDateTime(inputDate: string): string {
  const currentDate = new Date();
  const inputDateTime = new Date(inputDate);

  const timeDifference = currentDate.getTime() - inputDateTime.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return 'Сегодня ' + inputDateTime.toLocaleTimeString(undefined, { timeZoneName: 'short' });
  } else if (daysDifference === 1) {
    return 'Вчера ' + inputDateTime.toLocaleTimeString(undefined, { timeZoneName: 'short' });
  } else {
    const pluralForm = daysDifference > 1 && daysDifference < 5 ? 'дня' : 'дней';
    return `${daysDifference} ${pluralForm} назад ` + inputDateTime.toLocaleTimeString(undefined, { timeZoneName: 'short' });
  }
}
