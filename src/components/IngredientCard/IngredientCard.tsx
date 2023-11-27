import React, { useEffect, useState } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientCard.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { useDrag } from 'react-dnd';

import Modal from '../Modal/Modal'
import { useLocation, Link,  useNavigate } from 'react-router-dom'
import { IIngredient } from '../../types/common'
import { useAppDispatch, useAppSelector } from '../../services/store'

const IngredientCard: React.FC<IIngredient> = ( ingredient ) => {

  const dataTestid =  ingredient.type === "bun" ? "bun_card" : "ingredient_card"

  const dispatch = useAppDispatch()
  const [numberToOrder, setNumberToOrder] = useState<number>(0)

  const [id, setId] = useState<string>('')

  const ingredients = useAppSelector((state) => state.order.ingredients);
  const currentBun = useAppSelector((state) => state.order.bun)
  const orderNumber = useAppSelector((state) => state.order.orderNumber)
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

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  const handleIngredientOpen = React.useCallback(() => {
    // setIsModalOpen(true)
  }, [dispatch, ingredient])

  const handleIngredientClose = React.useCallback((e: MouseEvent | KeyboardEvent | undefined) => {
    if (e) {
      e.stopPropagation();
    }

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
      className={styles.mainLink}
    >

    <div
      data-testid={dataTestid}
      style={{opacity: isDrag ? 0.5 : 1, cursor: 'move'}}
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
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.ingredientTitle}>{ingredient.name}</p>
      {isModalOpen &&
        <Modal onClose={handleIngredientClose}>
          <IngredientDetails ingr={ingredient}/>
        </Modal>
      }
    </div>
    </Link>

  )
}



export default IngredientCard;