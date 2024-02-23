import { useContext, useMemo } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { UserContext } from '../../context/user.context';
import styles from './JournalList.module.css';

const sortItems = (a, b) => {
    if (a.date < b.date) {
        return 1;
    } else {
        return -1;
    }
};

function JournalList({ items, setItem }) {
    const { userId } = useContext(UserContext);

    const filteredItems = useMemo(
        () => items.filter((item) => item.userId === userId).sort(sortItems),
        [items, userId]
    );

    if (items.length === 0) {
        return <p>Записей пока нет, добавте первую</p>;
    }

    return (
        <div className={styles['journal-list']}>
            {filteredItems.map((item) => (
                <CardButton key={item.id} onClick={() => setItem(item)}>
                    <JournalItem
                        title={item.title}
                        date={item.date}
                        text={item.text}
                    />
                </CardButton>
            ))}
        </div>
    );
}

export default JournalList;
