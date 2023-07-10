import React from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon, Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import OrderDetails from '../OrderDetails/OrderDetails'
import ingredientPropTypes from '../../utils/prop-types'

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

const BurgerConstructor = ({data}) => {

  console.log(data)
  const topElement = data[0];
  const bottomElement = data[0];
  const middleElements = data.slice(1,);
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  return (
    <section className={styles.container}>
      <ConstructorElementBox
          type="top"
          isLocked={true}
          text={topElement.name +' (верх)'}
          price={topElement.price}
          thumbnail={topElement.image}
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
          text={`${bottomElement.name} (низ)`}
          price={bottomElement.price}
          thumbnail={bottomElement.image}
          extraClass={styles.bottomSide}

        />
      <div className={styles.sumContainer}>
        <div className={styles.sumAndIcon}>
          <p className="text text_type_digits-medium"> 610 </p>
          <CurrencyIcon/>
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleModalOpen}>
          Оформить заказ
        </Button>
        {        isModalOpen &&
          <OrderDetails ingredient={data[0]} onClose={handleModalClose}  />}


      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    ingredientPropTypes).isRequired,
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