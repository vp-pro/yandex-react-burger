import React, { useContext, useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import ingredientPropTypes from '../../utils/prop-types';
import { useSelector } from 'react-redux';
import { orderURL } from '../../utils/api'
import { setBun, addIngredient } from '../../services/slices/orderSlice';
import ConstructorElementBox from '../ConstructorElementBox/ConstructorElementBox'
import { useDispatch } from 'react-redux';

import { useDrop } from 'react-dnd';

const BurgerConstructor = () => {
  const initialIngredients = useSelector((state) => state.ingredients.ingredients)
  const ingredients = useSelector((state) => state.order.ingredients);
  const loading = useSelector((state) => state.ingredients.loading)
  const bun = useSelector((state) => state.order.bun)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const totalPrice = useSelector((state) => state.order.totalPrice)
  const dispatch = useDispatch()

  const [initialUseEffect, setInitialUseEffect] = useState(false)
  const [orderNumber, setOrderNumber] = React.useState(0)

  useEffect(() => {

    const handleSetBun = async () => {
      if (initialIngredients.length > 0 && !initialUseEffect) {
        const buns = initialIngredients.filter((element) => element.type === 'bun');
        const randomBun = buns[Math.floor(Math.random() * buns.length)];
        console.log(randomBun);
        await dispatch(setBun(randomBun));
        setInitialUseEffect(true);
      }
    };

    handleSetBun();
  }, [initialIngredients]);

  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  const handleModalOpen = () => {
    // fetchToOrder(Object.values(data))
  }

  const handleDrop = (item) => {
    console.error('I TRY TO ')
    dispatch(addIngredient(item))
    // setBurgerIngredients((prevIngredients) => [
    //   ...prevIngredients,
    //   item.id,
    // ]);
  };

  const [, drop] = useDrop({
    accept: 'ingredient',
    drop: handleDrop,
  });

  return (
    <section ref={drop} className={styles.container}>
      {loading && <h1> Loading...</h1>}
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
            {ingredients?.length > 0 && ingredients.map((element) =>
              <ConstructorElementBox
                text={element.name}
                price={element.price}
                thumbnail={element.image}
                key={element._id}
                dndIcon
              />)}
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
              <OrderDetails orderNumber={orderNumber} ingredient={bun} onClose={handleModalClose} />}
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
  dndIcon: PropTypes.bool,
};

export default BurgerConstructor;