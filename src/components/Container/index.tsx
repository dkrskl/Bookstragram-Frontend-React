import styles from './style.module.css';
import {PropsWithChildren} from 'react';

export function Container(props: PropsWithChildren<{}>) {
    return (
        <div className={styles.container}>
            {
                props.children
            }
        </div>
    );
}
