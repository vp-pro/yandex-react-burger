import React from 'react';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import { setBun, addIngredient, setIngredients, fetchOrderNumber, cleanOrder } from '../../services/slices/orderSlice';
import ConstructorElementBox from '../ConstructorElementBox/ConstructorElementBox'
import { useDrop } from 'react-dnd';
import Modal from '../Modal/Modal'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { IIngredient } from '../../types/common';
const BurgerConstructor: React.FC = () => {
  const ingredients = useAppSelector((state) => state.order.ingredients);
  const loading = useAppSelector((state) => state.ingredients.loading)
  const bun = useAppSelector((state) => state.order.bun)
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const totalPrice = useAppSelector((state) => state.order.totalPrice)
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.user.user)

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

  const handleDrop = (ingredient: IIngredient) => {
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

  const renderCard = (
    index: number,
    type: "top" | "bottom" | undefined = undefined,
    text: string,
    price: number,
    thumbnail: string,
    isLocked: boolean = false,
    id: string,
    extraClass: string,
    uuid?: string,
    ) => {
      const commonProps = {
        key: uuid,
        type,
        text,
        price,
        thumbnail,
        id,
        index,
        isLocked,
        extraClass,
        moveCard,
        uuid: uuid
      };
      const cardProps = type === undefined ? { ...commonProps, dndIcon: true } : commonProps;
      const data_testid =  type === undefined ? "constructor-ingredient" : "constructor-bun"
      return <ConstructorElementBox data-testid={data_testid} {...cardProps} />;
    }


  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragIngredient = ingredients[dragIndex];
    const newIngredients = [...ingredients];
    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, dragIngredient);
    dispatch(setIngredients(newIngredients));
  };

  return (
    <section
      data-testid="constructor-drop-area"
     ref={drop} className={styles.container}>
      {loading && <h1> Loading...</h1>}
      {!bun && <h1>Пожалуйста, перенесите сюда булку</h1>}
      {bun &&
        <>
        {
        renderCard(
          -1,
          "top",
          bun.name + ' (верх)',
          bun.price,
          bun.image,
          true,
          bun._id,
          styles.topSide
        )
      }
          <div className={styles.constructorList}>
            {ingredients?.length > 0 && bun && ingredients.map((ingredient, index) =>
              renderCard(
                index,
                undefined,
                ingredient.name,
                ingredient.price,
                ingredient.image,
                false,
                ingredient._id,
                styles.middleIngredient,
                ingredient.uuid
                )
            )}
          </div>
          {renderCard(
            999,
            "bottom",
            bun.name+ ' (низ)',
            bun.price,
            bun.image,
            true,
            bun._id,
            styles.bottomSide
          )}
          <div className={styles.sumContainer}>
            <div className={styles.sumAndIcon}>
              <p className="text text_type_digits-medium"> {totalPrice} </p>
              <CurrencyIcon type="primary"/>
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

export default BurgerConstructor;