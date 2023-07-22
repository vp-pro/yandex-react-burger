import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import IngredientCard from '../IngredientCard/IngredientCard.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import ingredientPropTypes from '../../utils/prop-types.js'

const BurgerIngredients = () => {
  const sectionsRef = {
    buns: useRef(null),
    sauces: useRef(null),
    mains: useRef(null),
    allIngredientsContainer: useRef(null),
  };

  const [current, setCurrent] = React.useState('булки');

  const setCurrentWithScroll = (value) => {
    const sectionRef = (value === 'булки')
      ? sectionsRef.buns
      : (value === 'соусы')
        ? sectionsRef.sauces
        : sectionsRef.mains;

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setCurrent(value);
  };


  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const loading = useSelector((state) => state.ingredients.loading)
  const dispatch = useDispatch()

  const buns = ingredients.filter(element => element.type === "bun")
  const sauces = ingredients.filter(element => element.type === "sauce")
  const mains = ingredients.filter(element => element.type === "main")

  useEffect(() => {
    if (!ingredients?.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients]);


  useEffect(() => {
    const scrollContainer = sectionsRef.allIngredientsContainer.current;

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  });


  const handleScroll = () => {
    const scrollContainer = sectionsRef.allIngredientsContainer.current;
    if (!scrollContainer) return;

    const scrollPositionPixels = scrollContainer.scrollTop;

    const { buns, sauces, mains } = sectionsRef;
    const bunsY = buns.current?.offsetTop || 0;
    const saucesY = sauces.current?.offsetTop || 0;
    const mainsY = mains.current?.offsetTop || 0;

    const visibleAreaTop = scrollPositionPixels;
    const visibleAreaBottom = scrollPositionPixels + scrollContainer.offsetHeight;


    const isInBunsSection = visibleAreaTop <= bunsY && bunsY < visibleAreaBottom;
    const isInSaucesSection = visibleAreaTop <= saucesY && saucesY < visibleAreaBottom;
    const isInMainsSection = visibleAreaTop <= mainsY && mainsY < visibleAreaBottom;

    if (isInBunsSection) {
      setCurrent('булки');
    } else if (isInSaucesSection) {
      setCurrent('соусы');
    } else if (isInMainsSection) {
      setCurrent('начинки');
    }
  };

  return (
    <section className={styles.sectionContainer}>
      {loading && <h1> Loading...</h1>}
      <header className={styles.header}>Соберите бургер</header>

      <div className={styles.tabs}>
        <Tab value="булки" active={current === 'булки'} onClick={() => setCurrentWithScroll('булки')}>
          Булки
        </Tab>
        <Tab value="соусы" active={current === 'соусы'} onClick={() => setCurrentWithScroll('соусы')}>
          Соусы
        </Tab>
        <Tab value="начинки" active={current === 'начинки'} onClick={() => setCurrentWithScroll('начинки')}>
          Начинки
        </Tab>
      </div>

      {!loading &&
        <div className={styles.allIngredientsContainer} ref={sectionsRef.allIngredientsContainer} onScroll={handleScroll}>

          <p className={styles.ingredientsTitle} ref={sectionsRef.buns}>Булки</p>
          <div className={styles.typeIngredientsContainer}>
            {buns.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient} />)}
          </div>

          <p className={styles.ingredientsTitle} ref={sectionsRef.sauces}>Соусы</p>
          <div className={styles.typeIngredientsContainer}>
            {sauces.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient} />)}
          </div>

          <p className={styles.ingredientsTitle} ref={sectionsRef.mains}>Основное</p>
          <div className={styles.typeIngredientsContainer}>
            {mains.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient} />)}
          </div>

        </div>
      }
    </section>

  )
}


BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    ingredientPropTypes
  ).isRequired,
};

export default BurgerIngredients