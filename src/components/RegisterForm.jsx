import React, { useState } from 'react';

const RegisterForm = ({ onToggleView }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (username.length < 3 || password.length < 5) {
            setError('Usuário deve ter 3+ caracteres e Senha 5+ caracteres.');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = storedUsers.some(user => user.username === username);

        if (userExists) {
            setError('Este nome de usuário já está em uso.');
            return;
        }

        // 3. Adiciona o novo usuário (ATENÇÃO: Senha salva em texto puro - APENAS PARA ESTUDO!)
        const newUser = { username, password }; 
        storedUsers.push(newUser);
        
        localStorage.setItem('users', JSON.stringify(storedUsers));
        
        setSuccess('Cadastro realizado com sucesso! Faça seu login.');
        setUsername('');
        setPassword('');
        
        setTimeout(() => {
            onToggleView();
        }, 2000);
    };

    return (
        <div className="register-container">
            <h3>Novo Cadastro</h3>
            
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="reg-username">Usuário:</label>
                    <input
                        type="text"
                        id="reg-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="reg-password">Senha:</label>
                    <input
                        type="password"
                        id="reg-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit">Cadastrar</button>
            </form>
            
            <p className="toggle-view">
                Já tem conta? <span onClick={onToggleView}>Entrar</span>
            </p>
        </div>
    );
};

export default RegisterForm;