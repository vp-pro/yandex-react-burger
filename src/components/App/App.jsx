import React from 'react';
import {
    Button,
    Logo,
    ConstructorElement,
    Tab,
    FormattedDate,
    Input,
    Counter,
    EmailInput,
    PasswordInput,
    BurgerIcon,
    CloseIcon,
    CheckMarkIcon,
    CurrencyIcon,
    DragIcon,
    EditIcon,
    HideIcon,
    InfoIcon,
    ListIcon,
    LockIcon,
    LogoutIcon,
    ProfileIcon,
    ShowIcon,
    DeleteIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    MenuIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'

const App = () => {

    return (
        <>
            <header>
                <AppHeader />
            </header>
            <main className={styles.mainContainer}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </>

    );
}

export default App;
