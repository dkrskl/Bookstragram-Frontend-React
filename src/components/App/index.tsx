import React from 'react';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import {Sidebar} from '../Sidebar';
import {getRoutes} from '../../routes';
import styles from './style.module.css';

const routes = getRoutes();

function AppComponent() {
    return (
        <>
            <Sidebar/>
            <div className={styles.container}>
                <Switch>
                    {
                        routes.map((r) => <Route {...r} key={r.path}/>)
                    }
                </Switch>
            </div>
        </>
    );
}

export function App() {
    return (
        <Router>
            <AppComponent/>
        </Router>
    );
}
