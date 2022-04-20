import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function PrivateRoute({ children }: { children: JSX.Element }) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'))
    const location = useLocation()
    if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
}