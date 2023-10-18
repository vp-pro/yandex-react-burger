import PropTypes from 'prop-types'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from'./OrderDetails.module.css'
import { useSelector } from 'react-redux'

const OrderDetails = () => {
  const orderNumber = useSelector((state) => state.order.orderNumber)
  const loading = useSelector((state) => state.order.loading)

  return (
    <>
    {loading &&  <p>Loading...</p>} 
    {orderNumber &&  <div className={styles.container}> 

    <p className={styles.orderNumber}>{orderNumber}</p>
          <p className={styles.orderNumberTitle}>идентификатор заказа</p>
          <div className={styles.icon}>
              <CheckMarkIcon/>
          </div>
          <p className={styles.readyText}>Ваш заказ начали готовить</p>
          <p className={styles.waitText}>Дождитесь готовности на орбитальной станции</p>
    </div> 
    }
    </>
  )
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number, 
};


export default OrderDetails