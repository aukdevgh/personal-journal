import SelectUser from '../SelectUser/SelectUser';
import styles from './Header.module.css';

function Header() {
    return (
        <>
            <img
                className={styles.logo}
                src="/logo.svg"
                alt="logo"
                width={180}
                height={26}
            />

            <SelectUser />
        </>
    );
}

export default Header;
