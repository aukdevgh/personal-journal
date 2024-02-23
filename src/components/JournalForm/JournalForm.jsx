import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import Button from '../Button/Button';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';
import styles from './JournalForm.module.css';

function JournalForm({ onSubmit, data, onDelete }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { userId } = useContext(UserContext);
    const { isValid, isFormReadyToSubmit, values } = formState;

    const titleRef = useRef();
    const dateRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        if (!data?.id) {
            dispatchForm({ type: 'CLEAR' });
        } else {
            dispatchForm({
                type: 'SET_VALUE',
                payload: {
                    ...data,
                    date: data.date.toISOString().split('T', 1)[0]
                }
            });
        }
    }, [data]);

    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.text:
                textRef.current.focus();
                break;
        }
    };

    useEffect(() => {
        focusError(isValid);

        let timerId;
        if (!isValid.date || !isValid.text || !isValid.title) {
            timerId = setTimeout(
                () => dispatchForm({ type: 'RESET_VALIDITY' }),
                2000
            );
        }

        return () => clearTimeout(timerId);
    }, [isValid]);

    useEffect(() => {
        if (isFormReadyToSubmit) {
            onSubmit({ ...values, userId });
            dispatchForm({ type: 'CLEAR' });
        }
    }, [isFormReadyToSubmit, values, onSubmit, userId]);

    const addJournalItem = (event) => {
        event.preventDefault();
        dispatchForm({ type: 'SUBMIT' });
    };

    const onChange = (e) => {
        dispatchForm({
            type: 'SET_VALUE',
            payload: { [e.target.name]: e.target.value }
        });
    };

    const deleteJournalItem = () => {
        onDelete(data.id);
        dispatchForm({ type: 'CLEAR' });
    };

    return (
        <form className={styles['journal-form']} onSubmit={addJournalItem}>
            <div className={styles['form-row']}>
                <Input
                    type="title"
                    name="title"
                    onChange={onChange}
                    value={values.title}
                    appearence="title"
                    isValid={isValid.title}
                    ref={titleRef}
                />
                {data?.id && (
                    <button
                        className={styles['btn-delete']}
                        aria-label="delete button"
                        type="button"
                        onClick={deleteJournalItem}
                    >
                        <img
                            src="/archive.svg"
                            alt="delete"
                            width={30}
                            height={30}
                        />
                    </button>
                )}
            </div>

            <div className={styles['form-row']}>
                <label className={styles['form-label']} htmlFor="date">
                    <img src="/calendar.svg" alt="calendar" />
                    <span>Date</span>
                </label>
                <Input
                    id="date"
                    type="date"
                    name="date"
                    onChange={onChange}
                    value={values.date}
                    isValid={isValid.date}
                    ref={dateRef}
                />
            </div>

            <div className={styles['form-row']}>
                <label className={styles['form-label']} htmlFor="tag">
                    <img src="/folder.svg" alt="calendar" />
                    <span>Tag</span>
                </label>
                <Input
                    id="tag"
                    type="text"
                    name="tag"
                    onChange={onChange}
                    value={values.tag}
                />
            </div>

            <textarea
                className={cn({
                    [styles['invalid']]: !isValid.text
                })}
                name="text"
                cols="30"
                rows="10"
                onChange={onChange}
                value={values.text}
                ref={textRef}
            ></textarea>
            <Button>save</Button>
        </form>
    );
}

export default JournalForm;
