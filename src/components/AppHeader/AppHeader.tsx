import React from 'react';
import { Logo, BurgerIcon, InfoIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useMatch } from 'react-router-dom'; // Import NavLink and useMatch from React Router v6
import styles from './AppHeader.module.css';

interface INavLinkButtonProps {
  text: string;
  to: string;
  icon: React.ReactElement;
}

const NavLinkButton: React.FC<INavLinkButtonProps> = ({ text, to, icon }) => {
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

const AppHeader: React.FC = () => {
  return (
    <header>
      <nav className={styles.header}>
        <div className={styles.left}>
          <NavLinkButton text={'Конструктор'} icon={<BurgerIcon type="primary"/>} to={'/'} />
          <NavLinkButton text={'Лента заказов'} icon={<InfoIcon  type="primary"/>} to={'/feed'} />
        </div>
        <div className={styles.center}>
          <Logo />
        </div>
        <div className={styles.right}>
          <NavLinkButton text={'Личный кабинет'} icon={<ProfileIcon type="primary"/>} to={'/profile'} />
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
