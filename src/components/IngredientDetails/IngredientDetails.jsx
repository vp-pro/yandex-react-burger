import React from 'react'
import PropTypes from 'prop-types'
import styles from './IngredientDetails.module.css'
import Modal from '../Modal/Modal'
import ingredientPropTypes from '../../utils/prop-types.js'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
const Element = ({title, value}) => {
  return(
    <div className={styles.element}>
      <p className='text text_type_main-default text_color_inactive'>{title}</p>
      <p className='text text_type_digits-default text_color_inactive'>{value}</p>
    </div>
  )
}

const IngredientDetails = () => {

  const [ingredient, setIngredient] = React.useState(null);

  const location = useLocation();
  const { id } = useParams();
  console.log('1',id)

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const watchingIngredient = useSelector((state)=> state.ingredients.watchingIngredient )

  console.log(watchingIngredient)
  console.log(ingredient)

  // Check if the component was opened in a modal
  if(location.state && location.state.background) {
    setIngredient( ingredients.find((item) => item._id === id) )

  } else {
    setIngredient( watchingIngredient)
  }

  console.log('4', ingredient)


  return (
    <>
    {ingredient &&  
    <>
      <img alt={ingredient.name} src={ingredient.image_large}/>
      <p className={styles.ingredientTitle}>{ingredient.name}</p>
      <div className={styles.elements}>
        <Element title='Калории,ккал' value={ingredient.calories}/>
        <Element title='Белки,г' value={ingredient.proteins}/>
        <Element title='Жиры,г' value={ingredient.fat}/>
        <Element title='Углеводы,г' value={ingredient.carbohydrates}/>
      </div>
      </>
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