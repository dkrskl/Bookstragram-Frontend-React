import {NavLink} from 'react-router-dom';
import styles from './style.module.css';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {faBook, faHome} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

type SidebarButton = {
    to: string;
    text: string;
    fontAwesomeIcon: IconDefinition;
}

function SidebarButton(props: SidebarButton) {
    return (
        <NavLink to={props.to} className={styles.sidebarItem} activeClassName={styles.sidebarItemActive} exact>
            <div className={styles.sidebarIconContainer}>
                <FontAwesomeIcon icon={props.fontAwesomeIcon}/>
            </div>
            <div className={styles.sidebarTextContainer}>
                {props.text}
            </div>
        </NavLink>
    );
}

export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <SidebarButton to='/' text='Home' fontAwesomeIcon={faHome}/>
            <SidebarButton to='/books' text='Books' fontAwesomeIcon={faBook}/>
        </div>
    );
}
