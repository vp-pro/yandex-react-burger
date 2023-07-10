import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal/Modal'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from'./OrderDetails.module.css'

const OrderDetails = ({order, onClose, children}) => {
  return (
<Modal onClose={onClose}>
      <p className={styles.orderNumber}>341325</p>
      <p className={styles.orderNumberTitle}>идентификатор заказа</p>
      <div className={styles.icon}>
          <CheckMarkIcon/>
      </div>

      <p className={styles.readyText}>Ваш заказ начали готовить</p>
      <p className={styles.waitText}>Дождитесь готовности на орбитальной станции</p>

  </Modal>
  )
}

OrderDetails.propTypes = {
  order: PropTypes.object, // or further specify the shape if you know it
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};


export default OrderDetails