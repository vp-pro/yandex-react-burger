import React, { useContext, useReducer, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import ingredientPropTypes from '../../utils/prop-types';
import { useSelector } from 'react-redux';
import { orderURL } from '../../utils/api'
import { setBun, addIngredient, changeBun, removeIngredient } from '../../services/slices/orderSlice';
import ConstructorElementBox from '../ConstructorElementBox/ConstructorElementBox'
import { useDispatch } from 'react-redux';

import { useDrop, useDrag } from 'react-dnd';


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

  // const handleClose = (element)={
  //   removeIngredient
  // }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  const handleModalOpen = () => {
    // fetchToOrder(Object.values(data))
  }

  const handleDrop = (ingredient) => {
    const positionWithScroll = calculatePositionWithScroll(position, initialPosition);
    // console.error('I TRY TO ', positionWithScroll)
    console.log('a', a)
    console.log('b', b)
    console.log('c', c)
    console.log('d', d)
    console.log('ELEMENTS')
    ingredients.forEach(element => element)
    if (ingredient.type==='bun'){
      dispatch(changeBun(ingredient))
    } else{
      dispatch(addIngredient(ingredient))
    }
  };
 

  
  const calculatePositionWithScroll = (position, initialPosition) => {
    if (!position || !initialPosition) {
      return null;
    }
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const x = position.x - initialPosition.x + scrollX;
    const y = position.y - initialPosition.y + scrollY;
    return { x, y };
  };
  const parentRef = useRef();

  const [{a,b,c,d, isOver, position, initialPosition}, drop] = useDrop({
    accept: 'ingredient',
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      position: monitor.getClientOffset(),
      a: monitor.getInitialClientOffset(),
      b: monitor.getInitialSourceClientOffset(),
      c: monitor.getSourceClientOffset(),
      d: monitor.getDifferenceFromInitialOffset(),
    })
  });

  const handleClose = (sequenceNumber) => {
    console.log('HandleClos,',sequenceNumber)
    dispatch(removeIngredient(sequenceNumber))
  }

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
          <div className={styles.constructorList} ref={parentRef}>
            {ingredients?.length > 0 && ingredients.map((element) =>{
                  const handleLogCoordinates = (event) => {
                  const parentRect = parentRef.current.getBoundingClientRect();
                  const elementRect = event.currentTarget.getBoundingClientRect();
                  const x = elementRect.left - parentRect.left;
                  const y = elementRect.top - parentRect.top;
                  console.log(`Position (${x}, ${y}):`, element);
                };
              return(<ConstructorElementBox
                text={element.name}
                price={element.price}
                thumbnail={element.image}
                key={element.sequenceNumber}
                handleClose={() => console.log("OMG")}
                dndIcon
                onClick={handleLogCoordinates}
              />)})}
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