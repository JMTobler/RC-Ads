
import React, { useState } from 'react';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';

const AuthPage = ({ setIsLoggedIn }) => {
    const [isLoginView, setIsLoginView] = useState(true); 

    const handleToggleView = () => {
        setIsLoginView(!isLoginView);
    };

    return (
        <div className="auth-page-container">
            {isLoginView ? (
                <LoginForm 
                    setIsLoggedIn={setIsLoggedIn} 
                    onToggleView={handleToggleView}
                />
            ) : (
                <RegisterForm 
                    onToggleView={handleToggleView}
                />
            )}
        </div>
    );
};

export default AuthPage;