import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsLoggedIn, onToggleView }) => { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); 

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        const userFound = storedUsers.find(
            user => user.username === username && user.password === password
        );

        if (userFound) {
            setIsLoggedIn(true); 
            localStorage.setItem('currentUser', JSON.stringify(userFound.username));
            navigate('/', { replace: true }); 
        } else {
            setError('Usuário ou senha incorretos.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Acesso ao Sistema</h2>
            
            {error && <p className="error-message">{error}</p>}
            
            <div>
                <label htmlFor="username">Usuário:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    required
                />
            </div>
            
            <div>
                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
            </div>
            
            <button type="submit">Entrar</button>
            
            <p className="toggle-view">
                Não tem conta? <span onClick={onToggleView}>Cadastre-se aqui</span>
            </p>
        </form>
    );
};

export default LoginForm;