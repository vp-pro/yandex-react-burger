import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Tab, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import data from '../../utils/data.json'
import styles from './burger-constructor.module.css'

const BurgerConstructor = () => {
  return (
    <section className={styles.section + ' pt-9'}>
      {data.map(element => <ConstructorElement text={element.name}
                                               price={element.price}
                                               img={element.image}
                                               key={element._id}
                                               extraClass='ml-8'/>
                )
      }
    </section>
  )
}

BurgerConstructor.propTypes = {}

export default BurgerConstructor