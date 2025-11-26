import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './components/AuthPage.jsx'; 
import AppointmentList from './components/AppointmentList.jsx'; 
import ScheduleForm from './components/ScheduleForm.jsx';
import './styles.css'; 

const ProtectedRoute = ({ children, isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; 
    }
    return children;
};

const Dashboard = ({ setIsLoggedIn }) => {
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('currentUser');
    };
    
    return (
        <div className="dashboard-container">
            <h1>🎉 Bem-vindo! Área Restrita</h1>
            <button onClick={handleLogout} className="logout-button">Sair (Logout)</button>
            <ScheduleForm />
            <AppointmentList />
        </div>
    );
};

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route 
                        path="/login" 
                        element={<AuthPage setIsLoggedIn={setIsLoggedIn} />} 
                    />

                    <Route 
                        path="/" 
                        element={
                            <ProtectedRoute isAuthenticated={isLoggedIn}>
                                <Dashboard setIsLoggedIn={setIsLoggedIn} /> 
                            </ProtectedRoute>
                        } 
                    />
                    
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;