import styles from './ConstructorElementBox.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../services/slices/orderSlice'
import { useDrop, useDrag } from 'react-dnd'
import { useRef } from 'react';
import PropTypes from 'prop-types'
import { useAppDispatch } from '../../services/store';
import { IIngredient } from '../../types/common';


interface ICard {
  type: "top" | "bottom" | undefined;
  isLocked: boolean;
  text: string;
  price: number;
  thumbnail: string;
  extraClass: string;
  id: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  dndIcon: boolean;
}

const ConstructorElementBox: React.FC<ICard> = ({type, isLocked, text, price, thumbnail, extraClass, id, index, moveCard, dndIcon}) => {

  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(removeIngredient(id))
  }

  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop({
    accept: 'Card',
    hover: (item: any, monitor) => {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()?.y

      if (clientOffset !== undefined) {
        const hoverClientY = clientOffset  - hoverBoundingRect.top;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
  
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
      }

      moveCard(dragIndex, hoverIndex)

      item.index = hoverIndex
    }
  })

  const [
    {
      isDragging
    }, drag
  ] = useDrag({
    type: "Card",
    item: () => {
      return { id, index }
    },
    collect: (monitor) => (
      { isDragging: monitor.isDragging() }
    )
  })
  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div className={
      styles.elementContainer
    }
      ref={
        isLocked ? null : ref
      }
      style={
        { opacity: opacity }
      }>
      {
        dndIcon && <div className={
          styles.icon
        }>
          <DragIcon type="primary" />
        </div>
      }
      <div className='pl-8'>
        <ConstructorElement 
          type={type}
          isLocked={isLocked}
          text={text}
          price={price}
          thumbnail={thumbnail}
          extraClass={extraClass}
          handleClose={handleClose}
           />
      </div>
    </div>
  )
}


export default ConstructorElementBox