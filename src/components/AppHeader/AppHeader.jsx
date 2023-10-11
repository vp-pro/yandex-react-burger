import React from 'react';
import PropTypes from 'prop-types';
import { Logo, BurgerIcon, InfoIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useMatch } from 'react-router-dom'; // Import NavLink and useMatch from React Router v6
import styles from './AppHeader.module.css';

const NavLinkButton = ({ text, to, icon }) => {
  const match = useMatch(to+'/*'); // Check if the current route matches the 'to' prop

  return (
      <NavLink  to={to}   className={`${styles.navLink} ${match ? styles.activeLink : styles.inactiveLink}`} >
        <div className={styles.icon}>
        {React.cloneElement(icon, { type: match ? 'primary' : 'secondary' })}
        </div>
        <p className={styles.customText}> {text} </p>
      </NavLink>
  );
};

const AppHeader = () => {
  return (
    <header>
      <nav className={styles.header}>
        <div className={styles.left}>
          <NavLinkButton text={'Конструктор'} icon={<BurgerIcon />} to={'/'} />
          <NavLinkButton text={'Лента заказов'} icon={<InfoIcon />} to={'/orders'} />
        </div>
        <div className={styles.center}>
          <Logo />
        </div>
        <div className={styles.right}>
          <NavLinkButton text={'Личный кабинет'} icon={<ProfileIcon/>} to={'/profile'} />
        </div>
      </nav>
    </header>
  );
};

NavLinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  to: PropTypes.string.isRequired,
};

export default AppHeader;
