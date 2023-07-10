import React, {useContext, useReducer, useEffect} from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon, Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import ingredientPropTypes from '../../utils/prop-types';
import IngredientContext from '../../contexts/IngredientContext';





const ConstructorElementBox = (props) => {
  return (
    <div className={styles.elementContainer}>
      {props.dndIcon && <div className={styles.icon} >
        <DragIcon type="primary" />
      </div>}
      <div className='pl-8'>
        <ConstructorElement
                  type={props.type}
                  isLocked={props.isLocked}
                  text={props.text}
                  price={props.price}
                  thumbnail={props.thumbnail}
                  extraClass={props.extraClass}
                />
      </div>
    </div>
  )
}

const totalPriceReducer = (state, action) => {
  switch (action.type){
    case 'SET_TOTAL_PRICE':
      return action.payload;
  }
}

const BurgerConstructor = () => {

  const urlToOrder = 'https://norma.nomoreparties.space/api/orders'
  const fetchToOrder = (array) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ingredients": array
        
      })
    }

    fetch(urlToOrder, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.success === true) {
          setOrderNumber(data.order.number)
          setIsModalOpen(true)
        }

      })
  } 

  const [orderNumber, setOrderNumber] = React.useState(0)
  const data = (useContext(IngredientContext))
  const bunElement = Object.values(data).filter(element => element.type==='bun')[0];
  const middleElements = Object.values(data).filter(element => element.type !== 'bun');
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [totalPrice, dispatch] = React.useReducer(totalPriceReducer, 0)

  useEffect (() => {
    let sum = 0

    Object.values(data).forEach(ingredient => {
      if (ingredient.type==='bun'){
        sum = sum + ingredient.price*2
      } else {
        sum = sum + ingredient.price
      }
      
    })
    dispatch({type: 'SET_TOTAL_PRICE', payload: sum})

  }, Object.values(IngredientContext))

  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  const handleModalOpen = () => {
    fetchToOrder(Object.values(data))
  }

  return (
    <section className={styles.container}>
      <ConstructorElementBox
          type="top"
          isLocked={true}
          text={bunElement.name +' (верх)'}
          price={bunElement.price}
          thumbnail={bunElement.image}
          extraClass={styles.topSide}

        />
      <div className={styles.constructorList}>
        {middleElements.map((element) => {
          return(
                <ConstructorElementBox
                text={element.name}
                price={element.price}
                thumbnail={element.image}
                key={element._id}
                dndIcon
              />)}
        )}

      </div>
      <ConstructorElementBox
          type="bottom"
          isLocked={true}
          text={`${bunElement.name} (низ)`}
          price={bunElement.price}
          thumbnail={bunElement.image}
          extraClass={styles.bottomSide}
        />
      <div className={styles.sumContainer}>
        <div className={styles.sumAndIcon}>
          <p className="text text_type_digits-medium"> {totalPrice} </p>
          <CurrencyIcon/>
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleModalOpen}>
          Оформить заказ
        </Button>
        {        isModalOpen &&
          <OrderDetails orderNumber={orderNumber} ingredient={data[0]} onClose={handleModalClose}  />}

      </div>
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