import React from 'react'
import PropTypes from 'prop-types'
import {  CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientCard.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx'


const IngredientCard = ({ingredient}) => {

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleIngredientOpen = React.useCallback(() => {
    setIsModalOpen(true)
  }
  , [])

  const handleIngredientClose = React.useCallback((e) => {
    e.stopPropagation();
    setIsModalOpen(false)
  }
  , [])

  return(
    <div  onClick={handleIngredientOpen} className={styles.ignredientCard}>
      <Counter count={5} extraClass={styles.counter}/>
      <img className={styles.ingredientImage} alt={ingredient.name} src={ingredient.image}/>
      <div className={styles.ingredientPriceContainer}>
        <p className={styles.ingredientPrice}>{ingredient.price}</p>
        <CurrencyIcon/>
      </div>
      <p className={styles.ingredientTitle}>{ingredient.name}</p>
      {isModalOpen && <IngredientDetails ingredient={ingredient} onClose={handleIngredientClose}/>}
    </div>
  )
}

export default IngredientCard;