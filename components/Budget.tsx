import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp, FixedExpense } from '../context/AppContext';

const Budget: React.FC = () => {
    const { userData, getVariableExpenses, updateUserData } = useApp();
    const location = useLocation();
    const [showAddExpense, setShowAddExpense] = useState(false);
    
    // Form Inputs
    const [newName, setNewName] = useState('');
    const [newAmount, setNewAmount] = useState('');

    const totalFixed = userData.fixedExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    const variableExpensesList = getVariableExpenses();
    const totalVariable = variableExpensesList.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = totalFixed + totalVariable;
    const remainingBudget = userData.monthlyIncome - totalExpenses;

    const handleAddExpense = () => {
        if (!newName || !newAmount) return;
        const newExp: FixedExpense = {
            id: Date.now().toString(),
            name: newName,
            amount: parseInt(newAmount) || 0,
            icon: 'calendar_today',
            paid: false
        };
        updateUserData({ fixedExpenses: [...userData.fixedExpenses, newExp] });
        setNewName('');
        setNewAmount('');
        setShowAddExpense(false);
    };

    const handleDeleteExpense = (id: string) => {
        updateUserData({ fixedExpenses: userData.fixedExpenses.filter(e => e.id !== id) });
    };

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
            <header className="px-6 py-8">
                 <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tighter">Presupuesto</h1>
                 <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Tu flujo de caja mensual</p>
            </header>

            <main className="flex-1 px-6 space-y-8">
                {/* Hero Card */}
                <section className="bg-brand-light dark:bg-brand-dark p-8 rounded-[2rem] shadow-xl text-white dark:text-black relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 size-40 bg-white/20 dark:bg-black/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Disponible Real</span>
                        <h2 className="text-5xl font-extrabold tracking-tighter mt-2">
                            ${remainingBudget.toLocaleString()}
                        </h2>
                        <div className="mt-6 flex items-center gap-4">
                            <div className="bg-black/10 dark:bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                                <p className="text-xs font-bold uppercase opacity-60">Ingresos</p>
                                <p className="font-bold text-lg">${userData.monthlyIncome.toLocaleString()}</p>
                            </div>
                             <div className="bg-black/10 dark:bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                                <p className="text-xs font-bold uppercase opacity-60">Gastos Totales</p>
                                <p className="font-bold text-lg">${totalExpenses.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fixed Expenses */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-xl text-zinc-900 dark:text-white tracking-tight">Fijos</h3>
                        <button 
                            onClick={() => setShowAddExpense(!showAddExpense)}
                            className="size-8 rounded-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-zinc-700 hover:border-black dark:hover:border-white transition-colors flex items-center justify-center"
                        >
                            <span className="material-symbols-outlined text-lg">{showAddExpense ? 'remove' : 'add'}</span>
                        </button>
                    </div>

                    {showAddExpense && (
                        <div className="mb-6 p-4 bg-surface-light dark:bg-surface-dark rounded-2xl animate-in slide-in-from-top-4 border border-gray-200 dark:border-zinc-800">
                             <input 
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Nombre (ej: Internet)" 
                                className="w-full bg-transparent border-b border-gray-300 dark:border-zinc-700 p-2 mb-4 text-base font-medium focus:outline-none focus:border-brand-light dark:focus:border-brand-dark dark:text-white placeholder-gray-400"
                                autoFocus
                            />
                            <div className="flex gap-3">
                                <input 
                                    type="number"
                                    value={newAmount}
                                    onChange={(e) => setNewAmount(e.target.value)}
                                    placeholder="Monto" 
                                    className="flex-1 bg-transparent border-b border-gray-300 dark:border-zinc-700 p-2 text-base font-medium focus:outline-none focus:border-brand-light dark:focus:border-brand-dark dark:text-white placeholder-gray-400"
                                />
                                <button 
                                    onClick={handleAddExpense}
                                    disabled={!newName || !newAmount}
                                    className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-xl font-bold disabled:opacity-50 hover:scale-105 transition-transform"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        {userData.fixedExpenses.map((exp) => (
                            <div key={exp.id} className="flex justify-between items-center bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 hover:border-brand-light/50 dark:hover:border-brand-dark/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="bg-surface-light dark:bg-zinc-800 p-2.5 rounded-xl text-gray-500 dark:text-gray-400">
                                        <span className="material-symbols-outlined text-[20px]">{exp.icon}</span>
                                    </div>
                                    <span className="font-bold text-zinc-900 dark:text-white">{exp.name}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-mono font-medium text-gray-600 dark:text-gray-300">${exp.amount.toLocaleString()}</span>
                                    <button onClick={() => handleDeleteExpense(exp.id)} className="text-gray-300 hover:text-accent-rose transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Variable Expenses */}
                <section>
                    <h3 className="font-bold text-xl text-zinc-900 dark:text-white tracking-tight mb-4">Variables</h3>
                     <div className="grid gap-4">
                        {variableExpensesList.length === 0 ? (
                            <div className="p-8 text-center text-gray-400 border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl bg-surface-light/50 dark:bg-surface-dark/50">
                                <span className="material-symbols-outlined text-3xl mb-2 opacity-50">data_usage</span>
                                <p className="text-sm">Sin gastos variables registrados.</p>
                            </div>
                        ) : (
                            variableExpensesList.map((item, idx) => (
                                <div key={idx} className="bg-white dark:bg-surface-dark p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 relative overflow-hidden">
                                    <div className="relative z-10 flex justify-between items-center mb-3">
                                        <span className="font-bold text-zinc-900 dark:text-white">{item.category}</span>
                                        <span className="font-bold font-mono text-zinc-900 dark:text-white">${item.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-surface-light dark:bg-zinc-800 h-2 rounded-full overflow-hidden relative z-10">
                                        <div 
                                            className="bg-zinc-900 dark:bg-white h-full rounded-full" 
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
            <BottomNav />
        </div>
    );
};

export default Budget;