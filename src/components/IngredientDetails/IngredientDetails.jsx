import React from 'react'
import PropTypes from 'prop-types'
import styles from './IngredientDetails.module.css'
import Modal from '../Modal/Modal'


const Element = ({title, value}) => {
  return(
    <div className={styles.element}>
      <p className='text text_type_main-default text_color_inactive'>{title}</p>
      <p className='text text_type_digits-default text_color_inactive'>{value}</p>
    </div>
  )
}

const IngredientDetails = ({ingredient, onClose, children}) => {

  return (
    <Modal onClose={(e) => onClose(e)} headerText='Детали ингредиента'>
      <img alt={ingredient.name} src={ingredient.image_large}/>
      <p className={styles.ingredientTitle}>{ingredient.name}</p>
      <div className={styles.elements}>
        <Element title='Калории,ккал' value={ingredient.calories}/>
        <Element title='Белки,г' value={ingredient.proteins}/>
        <Element title='Жиры,г' value={ingredient.fat}/>
        <Element title='Углеводы,г' value={ingredient.carbohydrates}/>
      </div>

  </Modal>
  )
}

Element.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};


export default IngredientDetails