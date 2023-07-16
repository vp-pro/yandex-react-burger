import styles from './ConstructorElementBox.module.css'
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../services/slices/orderSlice'

const ConstructorElementBox = (props) => {

  const dispatch = useDispatch()

  const handleClose = () =>{
    dispatch(removeIngredient())
  }
  
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
            handleClose={handleClose}
          />
        </div>
      </div>
    )
  }
  
  export default ConstructorElementBox 