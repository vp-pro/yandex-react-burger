import styles from './PageLayout.module.css'; // Import the CSS module
import PropTypes from 'prop-types'

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

Layout.propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.node, 
};

export default Layout;
