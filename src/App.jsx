import { useState } from 'react';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import styles from './App.module.css';
import { UserProvider } from './context/user.context';

function mapItems(items) {
    if (!items) {
        return [];
    }
    return items.map((item) => ({ ...item, date: new Date(item.date) }));
}

function App() {
    const [items, setItems] = useLocalStorage('data');
    const [selectedItem, setSelectedItem] = useState({});

    const addItem = (item) => {
        console.log(item);
        if (!item.id) {
            setItems([
                ...mapItems(items),
                {
                    ...item,
                    date: new Date(item.date),
                    id: mapItems(items).length
                        ? Math.max(...items.map((i) => i.id)) + 1
                        : 1
                }
            ]);
        } else {
            setItems(
                items.map((i) => {
                    if (i.id === item.id) {
                        return { ...item, date: new Date(item.date) };
                    }
                    return i;
                })
            );
        }
    };

    const deleteItem = (id) => {
        setItems((items) => items.filter((item) => item.id !== id));
    };

    return (
        <UserProvider>
            <div className={styles.app}>
                <LeftPanel>
                    <Header />
                    <JournalAddButton clearForm={() => setSelectedItem({})} />
                    <JournalList
                        items={mapItems(items)}
                        setItem={setSelectedItem}
                    />
                </LeftPanel>
                <Body>
                    <JournalForm
                        data={selectedItem}
                        onSubmit={addItem}
                        onDelete={deleteItem}
                    />
                </Body>
            </div>
        </UserProvider>
    );
}

export default App;
