import React, { useEffect, useState } from 'react';
import {Button, Logo, ConstructorElement, Tab, FormattedDate, Input, Counter, EmailInput, PasswordInput, BurgerIcon, CloseIcon, CheckMarkIcon, CurrencyIcon, DragIcon, EditIcon, HideIcon, InfoIcon, ListIcon, LockIcon, LogoutIcon, ProfileIcon, ShowIcon, DeleteIcon, ArrowUpIcon, ArrowDownIcon, MenuIcon}
from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'

const url = 'https://norma.nomoreparties.space/api/ingredients'
// trying to code as explicitly as possible as I am dumby:D

const App = () => {

  const [fetchedData, setFetchedData] = useState([])

  useEffect( () => {
    fetch(url)
    .then( response => {
      if (!response.ok) {
        //400-599
        throw new Error(`Request failed with status ${response.status}`)
      }
    return response.json()
  })
    .then(data => {
      setFetchedData([...data.data])
      console.log('[INFO] Fetched:', data.data)
    })
    .catch((error) => {
      throw new Error(`Something went wrong while fetching API. Error: ${error}`)
    })
  }
    ,[])

  return (
    <div className={styles.App}>
      <header>
        <AppHeader />
      </header>
      {fetchedData.length > 0 &&
        <main className={styles.container}>
            <BurgerIngredients data={fetchedData} />
            <BurgerConstructor data={fetchedData} />
        </main>
      }
    </div>

  );
}

export default App;
