import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal/Modal'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from'./OrderDetails.module.css'

const OrderDetails = ({order, onClose, children}) => {
  return (
<Modal onClose={onClose}>
      <p className={styles.orderNumber + ' text text_type_digits-large'}>341325</p>
      <p className={styles.orderNumberTitle + ' text text_type_main-medium'}>идентификатор заказа</p>
      <div className={styles.icon}>
          <CheckMarkIcon/>
      </div>

      <p className={styles.readyText + ' text text_type_main-default'}>Ваш заказ начали готовить</p>
      <p className={styles.waitText + ' text text_type_main-default text_color_inactive'}>Дождитесь готовности на орбитальной станции</p>

  </Modal>
  )
}

OrderDetails.propTypes = {}

export default OrderDetails