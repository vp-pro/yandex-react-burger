import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientCard.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx'
import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux'
import { setWatchingIngredient, removeWatchingIngredient } from '../../services/slices/ingredientsSlice'
import ingredientPropTypes from '../../utils/prop-types.js'


const IngredientCard = ({ ingredient }) => {
  const dispatch = useDispatch()
  const [numberToOrder, setNumberToOrder] = useState(0)


  const ingredients = useSelector((state) => state.order.ingredients);
  const currentBun = useSelector((state) => state.order.bun)

  useEffect(() => {
    const id = ingredient ? ingredient._id : '';

    if (ingredients && currentBun) {
      if (ingredient.type === 'bun') {
        if (id === currentBun._id) {
          setNumberToOrder(2);
        } else {
          setNumberToOrder(0)
        }
      } else {
        const n = Object.values(ingredients).reduce((count, element) => {
          if (element._id === id) {
            return count + 1;
          }
          return count;
        }, 0);
        setNumberToOrder(n)
      }
    }

  }, [ingredients, currentBun, ingredient])



  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleIngredientOpen = React.useCallback(() => {
    dispatch(setWatchingIngredient(ingredient))
    setIsModalOpen(true)
  }, [dispatch, ingredient])

  const handleIngredientClose = React.useCallback((e) => {
    e.stopPropagation();
    dispatch(removeWatchingIngredient())

    setIsModalOpen(false)
  }, [dispatch])

  return (
    <div
      style={{
        opacity: isDrag ? 0.5 : 1,
        cursor: 'move',
      }}

      ref={currentBun || ingredient.type === 'bun' ? dragRef : null}

      onClick={handleIngredientOpen} className={styles.ignredientCard}>
      {
        numberToOrder !== 0 ? (
          <Counter
            count={numberToOrder}
            extraClass={styles.counter} />
        ) : null
      }

      <img className={styles.ingredientImage} alt={ingredient.name} src={ingredient.image} />
      <div className={styles.ingredientPriceContainer}>
        <p className={styles.ingredientPrice}>{ingredient.price}</p>
        <CurrencyIcon />
      </div>
      <p className={styles.ingredientTitle}>{ingredient.name}</p>
      {isModalOpen && <IngredientDetails ingredient={ingredient} onClose={handleIngredientClose} />}
    </div>
  )
}

IngredientCard.propTypes = {
  ingredient: PropTypes.arrayOf(
    ingredientPropTypes
  ).isRequired,
};

export default IngredientCard;