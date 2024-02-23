import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import styles from './SelectUser.module.css';

function SelectUser() {
    const { userId, setUserId } = useContext(UserContext);

    const onChange = (e) => {
        setUserId(Number(e.target.value));
    };

    return (
        <select
            className={styles.select}
            value={userId}
            name="user"
            id="user"
            onChange={onChange}
        >
            <option value="1">Anton</option>
            <option value="2">Don</option>
        </select>
    );
}

export default SelectUser;
