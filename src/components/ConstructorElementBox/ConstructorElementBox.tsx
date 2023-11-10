import React, { useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { removeIngredient } from "../../services/slices/orderSlice";
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";
import { useAppDispatch } from "../../services/store";
import styles from "./ConstructorElementBox.module.css";

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

const ConstructorElementBox: React.FC<ICard> = ({
  type,
  isLocked,
  text,
  price,
  thumbnail,
  extraClass,
  id,
  index,
  moveCard,
  dndIcon,
}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement | null>(null);

  const handleRemoveIngredient = () => {
    dispatch(removeIngredient(id));
  };

  const [, drop] = useDrop({
    accept: "Card",
    hover: (item: { index: number }, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index; // Index of the dragged item
      const hoverIndex = index; // Index of the current element being hovered over

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (clientOffset) {
        console.log(clientOffset, dragIndex, hoverIndex, clientOffset.y, hoverBoundingRect.top)
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Determine whether to move the card based on the position of the drag and hover
        if (
          (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
          (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
        ) {
          moveCard(dragIndex, hoverIndex);
          item.index = hoverIndex; // Update the index of the dragged item
        }
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Card",
    item: { id, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const opacity = isDragging ? 0.5 : 1;

  drag(drop(ref));

  return (
    <div
      className={styles.elementContainer}
      ref={isLocked ? null : ref}
      style={{ opacity }}
    >
      {dndIcon && (
        <div className={styles.icon}>
          <DragIcon type="primary" />
        </div>
      )}
      <div className='pl-8'>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={text}
          price={price}
          thumbnail={thumbnail}
          extraClass={extraClass}
          handleClose={handleRemoveIngredient}
        />
      </div>
    </div>
  );
};

export default ConstructorElementBox;
