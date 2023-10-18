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
import Modal from '../Modal/Modal'
import { useLocation, Link,  useNavigate } from 'react-router-dom'

const IngredientCard = ({ ingredient }) => {
  const dispatch = useDispatch()
  const [numberToOrder, setNumberToOrder] = useState(0)

  const [id, setId] = useState('')

  const ingredients = useSelector((state) => state.order.ingredients);
  const currentBun = useSelector((state) => state.order.bun)
  const orderNumber = useSelector((state) => state.order.orderNumber)
  const navigate = useNavigate()
  useEffect(() => {
    if(ingredient) {
      setId(ingredient._id)
    }
  
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
    } else {
      setNumberToOrder(0);
    }
  }, [ingredients, currentBun, dispatch, ingredient]);


  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleIngredientOpen = React.useCallback(() => {
    // setIsModalOpen(true)
  }, [dispatch, ingredient])

  const handleIngredientClose = React.useCallback((e) => {
    e.stopPropagation();

    navigate(-1)
    // setIsModalOpen(false)
  }, [dispatch])

  const location = useLocation();

  return (
    <Link
      key={id}
      // Тут мы формируем динамический путь для нашего ингредиента
      to={`/ingredients/${id}`}
      // а также сохраняем в свойство background роут,
      // на котором была открыта наша модалка
      state={{ background: location }}
      // className={styles.link}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >

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
      {isModalOpen && 
        <Modal onClose={handleIngredientClose}>
          <IngredientDetails ingredient={ingredient}/>
        </Modal>
      }
    </div>
    </Link>
  
  )
}

IngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};


export default IngredientCard;