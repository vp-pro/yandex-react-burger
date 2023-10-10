import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './IngredientDetails.module.css'
import Modal from '../Modal/Modal'
import ingredientPropTypes from '../../utils/prop-types.js'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { useState } from 'react'
import { fetchIngredients } from '../../services/slices/ingredientsSlice'
import { useDispatch } from 'react-redux'

const Element = ({title, value}) => {
  return(
    <div className={styles.element}>
      <p className='text text_type_main-default text_color_inactive'>{title}</p>
      <p className='text text_type_digits-default text_color_inactive'>{value}</p>
    </div>
  )
}

const IngredientDetails = (props) => {

  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const ingredient = props.ingredient ? props.ingredient : ingredients.find((item) => item._id === id)

  return (
    <>
    {ingredient &&  
    <div className={styles.container}>
      <p className={styles.header}>Детали ингредиента</p>
      <img alt={ingredient.name} src={ingredient.image_large}/>
      <p className={styles.ingredientTitle}>{ingredient.name}</p>
      <div className={styles.elements}>
        <Element title='Калории,ккал' value={ingredient.calories}/>
        <Element title='Белки,г' value={ingredient.proteins}/>
        <Element title='Жиры,г' value={ingredient.fat}/>
        <Element title='Углеводы,г' value={ingredient.carbohydrates}/>
      </div>
    </div>
  }
    </>

  )
}

Element.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};


export default IngredientDetails