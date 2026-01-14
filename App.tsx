import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Mentorship from './components/Mentorship';
import ImportCenter from './components/ImportCenter';
import Onboarding from './components/Onboarding';
import Budget from './components/Budget';
import Goals from './components/Goals';
import Settings from './components/Settings';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
    return (
        <AppProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/mentor" element={<Mentorship />} />
                    <Route path="/import" element={<ImportCenter />} />
                    <Route path="/budget" element={<Budget />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </HashRouter>
        </AppProvider>
    );
};

export default App;
