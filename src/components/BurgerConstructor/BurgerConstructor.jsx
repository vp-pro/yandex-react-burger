import React from 'react';
import PropTypes from 'prop-types';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector } from 'react-redux';
import { setBun, addIngredient, setIngredients, fetchOrderNumber, cleanOrder } from '../../services/slices/orderSlice';
import ConstructorElementBox from '../ConstructorElementBox/ConstructorElementBox'
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import Modal from '../Modal/Modal'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const BurgerConstructor = () => {
  const ingredients = useSelector((state) => state.order.ingredients);
  const loading = useSelector((state) => state.ingredients.loading)
  const bun = useSelector((state) => state.order.bun)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const totalPrice = useSelector((state) => state.order.totalPrice)
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.user)

  const handleModalClose = () => {
    dispatch(cleanOrder())
    setIsModalOpen(false)
  }
  const navigate = useNavigate()

  const handleModalOpen = () => {
    if (!user){
      navigate('/login')
    } else {
      dispatch(fetchOrderNumber())
      setIsModalOpen(true)
    }

  }

  const handleDrop = (ingredient) => {
    ingredients.forEach(element => element)
    if (ingredient.type === 'bun') {
      dispatch(setBun(ingredient))
    } else {
      dispatch(addIngredient({ ingredient: ingredient, uuid: uuidv4() }))
    }
  };

  const [, drop] = useDrop({
    accept: 'ingredient',
    drop: handleDrop,
    hover: () => {
    },
    collect: (monitor) => ({
      position: monitor.getClientOffset(),
    })
  });

  const renderCard = (ingredient, index) => {
    return (
      <ConstructorElementBox
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        key={ingredient.id}
        id={ingredient.id}
        index={index}
        extraClass={styles.middleIngredient}
        dndIcon
        moveCard={moveCard}
      />
    )
  }

  const moveCard = (dragIndex, hoverIndex) => {
    const dragIngredients = ingredients[dragIndex];
    const newIngredients = [...ingredients];
    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, dragIngredients)

    dispatch(setIngredients(newIngredients))
  }

  return (
    <section ref={drop} className={styles.container}>
      {loading && <h1> Loading...</h1>}
      {!bun && <h1>Пожалуйста, перенесите сюда булку</h1>}
      {bun &&
        <>
          <ConstructorElementBox
            type="top"
            isLocked={true}
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={styles.topSide}
          />
          <div className={styles.constructorList}>
            {ingredients?.length > 0 && bun && ingredients.map((element, index) =>

              renderCard(element, index)

            )}
          </div>
          <ConstructorElementBox
            type="bottom"
            isLocked={true}
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={styles.bottomSide}
          />
          <div className={styles.sumContainer}>
            <div className={styles.sumAndIcon}>
              <p className="text text_type_digits-medium"> {totalPrice} </p>
              <CurrencyIcon />
            </div>
            <Button htmlType="button" type="primary" size="medium" onClick={handleModalOpen}>
              Оформить заказ
            </Button>
            {isModalOpen &&
              <Modal onClose={handleModalClose}>
                <OrderDetails />
              </Modal>}
          </div>
        </>
      }
    </section>
  );
};

ConstructorElementBox.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
  dndIcon: PropTypes.bool,
};

export default BurgerConstructor;