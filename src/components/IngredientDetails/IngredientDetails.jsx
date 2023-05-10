import React from 'react'
import PropTypes from 'prop-types'
import styles from './IngredientDetails.module.css'
import Modal from '../Modal/Modal'

const IngredientDetails = props => {
  return (
    <Modal onClose={props.onClose} headerText={'SomeHeader'}>
      <div nameClass={styles.IngredientDetails}>IngredientDetails</div>
    </Modal>
  )
}

IngredientDetails.propTypes = {}

export default IngredientDetails