import React from 'react'
import PropTypes from 'prop-types'
import { Tab, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerIngredients = () => {

  const [current, setCurrent] = React.useState('соусы')
  return (
    <section >
      <h1>Соберите бургер</h1>
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
        <h2>Булки</h2>
        <div>
        </div>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {}

export default BurgerIngredients