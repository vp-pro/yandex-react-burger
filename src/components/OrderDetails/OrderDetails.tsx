import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from'./OrderDetails.module.css'
import { useAppSelector } from '../../services/store'

const OrderDetails: React.FC = () => {
  const orderNumber = useAppSelector((state) => state.order.orderNumber)
  const loading = useAppSelector((state) => state.order.loading)

  return (
    <>
    {loading &&  <p>Loading...</p>} 
    {orderNumber &&  <div className={styles.container}> 

    <p className={styles.orderNumber}>{orderNumber}</p>
          <p className={styles.orderNumberTitle}>идентификатор заказа</p>
          <div className={styles.icon}>
              <CheckMarkIcon type='primary'/>
          </div>
          <p className={styles.readyText}>Ваш заказ начали готовить</p>
          <p className={styles.waitText}>Дождитесь готовности на орбитальной станции</p>
    </div> 
    }
    </>
  )
}



export default OrderDetails