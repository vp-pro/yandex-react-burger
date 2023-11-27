import React, { useEffect, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import IngredientCard from '../IngredientCard/IngredientCard'
import { useAppSelector } from '../../services/store';

const BurgerIngredients: React.FC = () => {
  const sectionsRef = {
    buns: useRef<HTMLDivElement | null>(null),
    sauces: useRef<HTMLDivElement | null>(null),
    mains: useRef<HTMLDivElement | null>(null),
    allIngredientsContainer: useRef<HTMLDivElement | null>(null),
  };

  const [current, setCurrent] = React.useState<string>('булки');

  const setCurrentWithScroll = (value: string) => {
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


  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const loading = useAppSelector((state) => state.ingredients.loading)

  const buns = ingredients.filter(element => element.type === "bun")
  const sauces = ingredients.filter(element => element.type === "sauce")
  const mains = ingredients.filter(element => element.type === "main")


  useEffect(() => {
    const scrollContainer = sectionsRef.allIngredientsContainer.current;
    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, []);


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
            {buns.map(ingredient => <IngredientCard data-testid="bun_card" key={ingredient._id} {...ingredient} />)}
          </div>

          <p className={styles.ingredientsTitle} ref={sectionsRef.sauces}>Соусы</p>
          <div className={styles.typeIngredientsContainer}>
            {sauces.map(ingredient => <IngredientCard  data-testid="ingredient-card" key={ingredient._id} {...ingredient} />)}
          </div>

          <p className={styles.ingredientsTitle} ref={sectionsRef.mains}>Основное</p>
          <div className={styles.typeIngredientsContainer}>
            {mains.map(ingredient => <IngredientCard  data-testid="ingredient-card" key={ingredient._id} {...ingredient} />)}
          </div>

        </div>
      }
    </section>

  )
}


export default BurgerIngredients