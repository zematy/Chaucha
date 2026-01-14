import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp, Goal } from '../context/AppContext';

const Goals: React.FC = () => {
    const { userData, addGoal, updateGoalAmount } = useApp();
    const location = useLocation();
    const [isCreating, setIsCreating] = useState(false);
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');

    const handleCreate = () => {
        if(!name || !target) return;
        const newGoal: Goal = {
            id: Date.now().toString(),
            name,
            targetAmount: parseInt(target),
            currentAmount: 0,
            type: 'savings',
            icon: 'flag',
            color: 'bg-black'
        };
        addGoal(newGoal);
        setIsCreating(false);
        setName('');
        setTarget('');
    }

    // Bottom Navigation Component (Internal)
    const BottomNav = () => {
        const isActive = (path: string) => location.pathname === path;
        const baseClass = "flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300";
        const activeClass = "bg-black dark:bg-brand-dark text-white dark:text-black shadow-lg scale-110";
        const inactiveClass = "text-gray-400 hover:text-gray-900 dark:hover:text-white";

        return (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                <div className="glass px-2 py-2 rounded-full shadow-2xl border border-gray-200 dark:border-zinc-800 flex items-center gap-1">
                    <Link to="/" className={`${baseClass} ${isActive('/') ? activeClass : inactiveClass}`}>
                        <span className={`material-symbols-outlined text-[24px] ${isActive('/') ? 'icon-filled' : ''}`}>home</span>
                    </Link>
                    <Link to="/budget" className={`${baseClass} ${isActive('/budget') ? activeClass : inactiveClass}`}>
                        <span className={`material-symbols-outlined text-[24px] ${isActive('/budget') ? 'icon-filled' : ''}`}>pie_chart</span>
                    </Link>
                    <Link to="/mentor" className={`${baseClass} bg-brand-light dark:bg-white text-white dark:text-black mx-2`}>
                         <span className="material-symbols-outlined text-[24px] icon-filled">smart_toy</span>
                    </Link>
                    <Link to="/goals" className={`${baseClass} ${isActive('/goals') ? activeClass : inactiveClass}`}>
                        <span className={`material-symbols-outlined text-[24px] ${isActive('/goals') ? 'icon-filled' : ''}`}>flag</span>
                    </Link>
                    <Link to="/settings" className={`${baseClass} ${isActive('/settings') ? activeClass : inactiveClass}`}>
                        <span className={`material-symbols-outlined text-[24px] ${isActive('/settings') ? 'icon-filled' : ''}`}>tune</span>
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display pb-32 transition-colors duration-300">
            <header className="px-6 py-8 flex justify-between items-center">
                 <div>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tighter">Metas</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Objetivos financieros</p>
                 </div>
                 {!isCreating && (
                    <button 
                        onClick={() => setIsCreating(true)}
                        className="size-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-105 transition-transform"
                    >
                        <span className="material-symbols-outlined">add</span>
                    </button>
                 )}
            </header>

            <main className="flex-1 px-6 space-y-6">
                
                {isCreating && (
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 animate-in fade-in zoom-in-95">
                        <h3 className="font-bold mb-4 dark:text-white">Nueva Meta</h3>
                        <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre (ej: Vacaciones)" 
                            className="w-full bg-white dark:bg-black border-none rounded-2xl p-4 mb-3 text-base font-medium focus:ring-2 focus:ring-black dark:focus:ring-brand-dark dark:text-white"
                            autoFocus
                        />
                        <input 
                            type="number"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            placeholder="Monto Objetivo" 
                            className="w-full bg-white dark:bg-black border-none rounded-2xl p-4 mb-6 text-base font-medium focus:ring-2 focus:ring-black dark:focus:ring-brand-dark dark:text-white"
                        />
                        <div className="flex gap-3">
                            <button onClick={() => setIsCreating(false)} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">Cancelar</button>
                            <button onClick={handleCreate} className="flex-1 bg-brand-light dark:bg-brand-dark text-white dark:text-black rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity">Crear</button>
                        </div>
                    </div>
                )}

                <div className="grid gap-5">
                    {userData.goals.length === 0 && !isCreating && (
                        <div className="text-center py-10 opacity-50">
                            <span className="material-symbols-outlined text-4xl mb-2">savings</span>
                            <p>No tienes metas activas.</p>
                        </div>
                    )}
                    
                    {userData.goals.map((goal) => {
                        const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
                        return (
                            <div key={goal.id} className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 relative overflow-hidden group hover:border-brand-light dark:hover:border-brand-dark transition-colors">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="font-bold text-xl text-zinc-900 dark:text-white">{goal.name}</h3>
                                        <p className="text-sm text-gray-400 font-mono mt-1">Meta: ${goal.targetAmount.toLocaleString()}</p>
                                    </div>
                                    <div className="size-12 rounded-full bg-surface-light dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white font-bold text-xs border border-gray-200 dark:border-zinc-700">
                                        {Math.round(progress)}%
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tighter">${goal.currentAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full h-4 bg-surface-light dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-brand-light dark:bg-brand-dark rounded-full transition-all duration-700"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button 
                                        onClick={() => updateGoalAmount(goal.id, 50000)}
                                        className="flex-1 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold"
                                    >
                                        + $50.000
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
            <BottomNav />
        </div>
    );
};

export default Goals;