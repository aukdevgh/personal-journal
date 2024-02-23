import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Input.module.css';

const Input = forwardRef(function Input(
    { className, appearence, isValid = true, ...props },
    ref
) {
    return (
        <input
            className={cn(styles['input'], className, {
                [styles['invalid']]: !isValid,
                [styles['input-title']]: appearence === 'title'
            })}
            {...props}
            ref={ref}
        />
    );
});

export default Input;
