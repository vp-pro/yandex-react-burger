import styles from './PageLayout.module.css'; // Import the CSS module

const Layout = ({centered, children}) => {
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
