import styles from './PageLayout.module.css'; // Import the CSS module

interface ILayout{
  centered: boolean,
  children: React.ReactNode
}

const Layout: React.FC<ILayout> = ({centered, children}) => {
  return (
    <>
    {centered ? 
        <div className={styles['centeredContainer']}>
            {children}
        </div>
        :
        <div className={styles.topContainer}>
            {children}
        </div>
    }
    </>
    
    
  );
};

export default Layout;
