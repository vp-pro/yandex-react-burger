import React from 'react';
import './App.css';
import {Button, Logo, ConstructorElement, Tab, FormattedDate, Input, Counter, EmailInput, PasswordInput, BurgerIcon, CloseIcon, CheckMarkIcon, CurrencyIcon, DragIcon, EditIcon, HideIcon, InfoIcon, ListIcon, LockIcon, LogoutIcon, ProfileIcon, ShowIcon, DeleteIcon, ArrowUpIcon, ArrowDownIcon, MenuIcon}
from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from './components/AppHeader/AppHeader'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'

function App() {
  console.log("This is a text!")
  return (
    <div className="App">
      <header className="App-header">
        <AppHeader></AppHeader>
      </header>
      <body style={{display: 'flex', justifyContent: 'center'}}>
        <BurgerIngredients></BurgerIngredients>
        <BurgerConstructor></BurgerConstructor>
      </body>
    </div>
  );
}

export default App;
