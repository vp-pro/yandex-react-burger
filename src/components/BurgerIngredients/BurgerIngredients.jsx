import React from 'react'
import PropTypes from 'prop-types'
import { Tab, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import IngredientDetails from '../IngredientDetails/IngredientDetails'


const IngredientCard = ({name, image, price}) => {
  return(
    <>
      <img alt={name} src={image}/>
      <p>{price}</p>
      <p>{name}</p>
    </>
  )
}

image_large
name
price


const BurgerIngredients = ({data}) => {

  const [current, setCurrent] = React.useState('соусы')
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleIngredientOpen = React.useCallback(() => {
    setIsModalOpen(true)
  }
  , [])

  const handleIngredientClose = React.useCallback(() => {
    setIsModalOpen(false)
  }
  , [])

  return (
    <section className={styles.container}>
      <header>Соберите бургер</header>
      <div style={{ display: 'flex' }}>
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
      <div>
        <button onClick={handleIngredientOpen}>CLICK ME PLEASE MY FRIEND</button>
        {isModalOpen && <IngredientDetails ingredient={data[0]} onClose={handleIngredientClose}/>}
        <div>
        </div>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {}

export default BurgerIngredients