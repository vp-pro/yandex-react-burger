import styles from './Home.module.css'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'

const HomePage = () => {
    return (
            <main className={styles.mainContainer}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
    );
}

export default HomePage;