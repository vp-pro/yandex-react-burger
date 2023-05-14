import React from 'react'
import PropTypes from 'prop-types'
import { Tab, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientPropTypes from '../../utils/prop-types.js'

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
    <div onClick={handleIngredientOpen} className={styles.ignredientCard}>
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

const BurgerIngredients = ({data}) => {

  const [current, setCurrent] = React.useState('соусы')

  const buns = data.filter(element => element.type=== "bun")
  const sauces = data.filter(element => element.type==="sauce")
  const mains = data.filter(element => element.type ==="main")


  return (
    <section className={styles.sectionContainer}>
      <header className={styles.header}>Соберите бургер</header>
      <div className={styles.tabs}>
        <Tab value="булки" active={current === 'булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="соусы" active={current === 'соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="начинки" active={current === 'начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={styles.allIngredientsContainer}>

        <p className={styles.ingredientsTitle }>Булки</p>
        <div className={styles.typeIngredientsContainer}>
          {buns.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient} />)}
        </div>

        <p className={styles.ingredientsTitle }>Соусы</p>
        <div className={styles.typeIngredientsContainer}>
          {sauces.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient} />)}
        </div>

        <p className={styles.ingredientsTitle }>Основное</p>
        <div className={styles.typeIngredientsContainer}>
          {mains.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient} />)}
        </div>

      </div>
    </section>
  )
}
IngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    ingredientPropTypes
  ).isRequired,
};

export default BurgerIngredients