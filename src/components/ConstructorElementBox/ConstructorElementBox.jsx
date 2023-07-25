import styles from './ConstructorElementBox.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../services/slices/orderSlice'
import { useDrop, useDrag } from 'react-dnd'
import { useRef } from 'react';
import PropTypes from 'prop-types'

const ConstructorElementBox = ({
  type,
  isLocked,
  text,
  price,
  thumbnail,
  extraClass,
  id,
  index,
  moveCard,
  dndIcon
}) => {

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(removeIngredient(id))
  }

  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: 'Card',
    hover: (item, monitor) => {
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
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
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
        <ConstructorElement type={type}
          isLocked={isLocked}
          text={text}
          price={price}
          thumbnail={thumbnail}
          extraClass={extraClass}
          handleClose={handleClose}
          id={id} />
      </div>
    </div>
  )
}

ConstructorElementBox.propTypes = {
  type: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
  dndIcon: PropTypes.bool.isRequired,
};

export default ConstructorElementBox
