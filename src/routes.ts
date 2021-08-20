import {RouteComponentProps} from 'react-router-dom';
import {Home} from './screens/Home';
import {Books} from './screens/Books';
import React from 'react';

type Route = {
    path: string;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    exact?: boolean;
}

export const getRoutes = (): Route[] => [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/books',
        component: Books,
        exact: true,
    },
];
