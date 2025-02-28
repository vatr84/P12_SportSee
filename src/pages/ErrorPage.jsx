import React from 'react';
import { useLocation } from 'react-router';
import './ErrorPage.css';

const ErrorPage = () => {
    const location = useLocation();
    const { message } = location.state || { message: 'An error occurred' };

    return (
        <main>
            <div className="error">
                <h1>Error</h1>
                <p>{message}</p>
            </div>
        </main>
    );
};

export default ErrorPage;