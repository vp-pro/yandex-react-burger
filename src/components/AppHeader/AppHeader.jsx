import React from 'react';
import PropTypes from 'prop-types';
import { Logo, BurgerIcon, InfoIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

const HeaderButton = (props) => {
  const textClass = props.active
    ? 'text text_type_main-default text_color_active'
    : 'text text_type_main-default text_color_inactive';
  const iconType = props.active ? 'primary' : 'secondary';

  return (
    <div className={styles.button}>
      {React.cloneElement(props.icon, { type: iconType })}
      <a href="https://re.panferov.site/" className={textClass + ' ml-2'}>
        {props.text}
      </a>
    </div>
  );
};

const AppHeader = () => {
  return (
    <header>
      <nav className={styles.header}>
        <div className={styles.left}>
          <HeaderButton text={'Конструктор'} icon={<BurgerIcon />} active={true} />
          <HeaderButton text={'Лента заказов'} icon={<InfoIcon />} active={false} />
        </div>
        <div className={styles.center}>
          <Logo />
        </div>
        <div className={styles.right}>
          <HeaderButton text={'Личный кабинет'} icon={<ProfileIcon />} active={false} />
        </div>
      </nav>
    </header>
  );
};

HeaderButton.propTypes = {
  active: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default AppHeader;