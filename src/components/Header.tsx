import styles from './Header.module.css'
import todoLogo from '../assets/Logo.png'

function Header() {
  return (
    <div className={styles.header}>
      <img src={todoLogo} alt='logotipo' />
    </div>
  );
}

export default Header;
