import React from 'react';
import PropTypes from 'prop-types';

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector } from 'react-redux';
import { setBun, addIngredient, setIngredients, fetchOrderNumber, cleanOrder } from '../../services/slices/orderSlice';
import ConstructorElementBox from '../ConstructorElementBox/ConstructorElementBox'
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import Modal from '../Modal/Modal'

const LoginPage = () => {
    const [value, setValue] = React.useState('bob@example.com')
    const onChange = e => {
      setValue(e.target.value)
    }
  return (
        <>
              <p className="text text_type_digits-medium"> </p>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <EmailInput
        onChange={onChange}
        value={value}
        name={'email'}
        placeholder="Логин"
        isIcon={true}
        extraClass="mb-2"
      />
      <PasswordInput
        onChange={onChange}
        value={value}
        name={'password'}
        extraClass="mb-2"
      />
    </div>
         
        </>
      
  );
};

export default LoginPage;


