import styles from './CardButton.module.css';
import cn from 'classnames';

function CardButton({ children, className, ...props }) {
    return (
        <button
            className={cn(styles['card-button'], { [className]: className })}
            {...props}
        >
            {children}
        </button>
    );
}

export default CardButton;
