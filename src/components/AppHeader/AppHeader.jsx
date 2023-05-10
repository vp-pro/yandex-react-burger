import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import {Logo, BurgerIcon, InfoIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'

const HeaderButton = props => {
  let textClass = props.active ? 'text text_type_main-default text_color_active' : 'text text_type_main-default text_color_inactive'
    let iconType = props.active ? 'primary' : 'secondary'

    return(
        <div className={'mt-2 mb-2 pl-5 pr-5 mr-2 ' + styles.button}>
            {React.cloneElement(props.icon, { type: iconType})}
            <p className={textClass + ' ml-2'}>{props.text}</p>
        </div>
    )
}

const AppHeader = () => {
    let textList = ['Конструктор', 'Лента заказов', 'Личный кабинет']
    let iconList = [<BurgerIcon/>, <InfoIcon/>, <ProfileIcon/>]

  return (
      <nav className={'pb-4 pt-4 ' + styles.header}>
        <div className={styles.left}>
          <HeaderButton text={textList[0]} icon={iconList[0]} active={true} />
          <HeaderButton text={textList[1]} icon={iconList[1]} active={false} />
        </div>
        <div className={styles.center}>
          <Logo />
        </div>
        <div className={styles.right}>
          <HeaderButton text={textList[2]} icon={iconList[2]} active={false} />
        </div>
      </nav>
  )
}

AppHeader.propTypes = {}

export default AppHeader