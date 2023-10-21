import React from 'react'
import styles from './IngredientDetails.module.css'
import { IIngredient } from '../../types/common'
import { useAppSelector } from '../../services/store'
import { useParams } from 'react-router-dom'


interface IElement{
  title: string,
  value: string | number
}

const Element: React.FC<IElement> = ({title, value}) => {
  return(
    <div className={styles.element}>
      <p className='text text_type_main-default text_color_inactive'>{title}</p>
      <p className='text text_type_digits-default text_color_inactive'>{value}</p>
    </div>
  )
}

const IngredientDetails: React.FC<{ ingr?: IIngredient }> = ({ ingr }) => {

  const { id } = useParams();
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const ingredient = ingr ? ingr : ingredients.find((item) => item._id === id)

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

export default IngredientDetails