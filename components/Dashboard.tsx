import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = useApp();

    useEffect(() => {
        if (!userData.isConfigured) {
            navigate('/onboarding');
        }
    }, [userData.isConfigured, navigate]);

    const creditAvailable = userData.creditCardLimit - userData.creditCardUsed;
    const creditUsagePercent = (userData.creditCardUsed / userData.creditCardLimit) * 100;

    if (!userData.isConfigured) return null;

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
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display pb-32 transition-colors duration-300 selection:bg-brand-light dark:selection:bg-brand-dark">
            
            {/* Ultra Minimal Header */}
            <header className="pt-8 pb-4 px-6 flex justify-between items-end">
                <div>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Total Balance</p>
                    <h1 className="text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tighter">
                        ${(userData.currentBalance - userData.creditCardUsed).toLocaleString()}
                    </h1>
                </div>
                <div className="size-10 rounded-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-zinc-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-900 dark:text-white">notifications</span>
                </div>
            </header>

            <main className="flex-1 flex flex-col gap-8 pt-4">
                
                {/* Horizontal Scroll Cards - Brutalist Style */}
                <section className="w-full overflow-x-auto hide-scrollbar px-6 flex gap-4 pb-4">
                    
                    {/* Main Card */}
                    <div className="shrink-0 w-[300px] h-[180px] rounded-3xl p-6 flex flex-col justify-between bg-zinc-900 dark:bg-white text-white dark:text-black relative overflow-hidden group transition-transform active:scale-[0.98]">
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                             <span className="material-symbols-outlined text-8xl">account_balance</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <span className="material-symbols-outlined text-3xl">contactless</span>
                            <span className="text-xs font-bold border border-white/30 dark:border-black/30 px-2 py-1 rounded-full uppercase">Débito</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold tracking-tight mb-1">${userData.currentBalance.toLocaleString()}</p>
                            <div className="flex justify-between items-center opacity-60">
                                <p className="text-sm font-mono">**** 4821</p>
                                <p className="text-xs font-bold">VISA</p>
                            </div>
                        </div>
                    </div>

                    {/* Credit Card */}
                    <div className="shrink-0 w-[300px] h-[180px] rounded-3xl p-6 flex flex-col justify-between bg-white dark:bg-surface-dark border border-gray-200 dark:border-zinc-800 text-zinc-900 dark:text-white relative">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Deuda Actual</p>
                                <p className="text-2xl font-bold tracking-tight">${userData.creditCardUsed.toLocaleString()}</p>
                            </div>
                            <div className="size-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                                <span className="material-symbols-outlined">credit_card</span>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                             <div className="flex justify-between text-xs font-medium text-gray-500">
                                <span>Límite: ${userData.creditCardLimit.toLocaleString()}</span>
                                <span className={creditUsagePercent > 80 ? 'text-accent-rose' : 'text-brand-light dark:text-brand-dark'}>{Math.round(creditUsagePercent)}%</span>
                             </div>
                             <div className="w-full bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full ${creditUsagePercent > 80 ? 'bg-accent-rose' : 'bg-brand-light dark:bg-brand-dark'}`} 
                                    style={{ width: `${Math.min(creditUsagePercent, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Actions - Pills */}
                <section className="px-6 grid grid-cols-2 gap-3">
                     <button onClick={() => navigate('/import')} className="group flex items-center gap-3 p-4 rounded-2xl bg-brand-light/10 dark:bg-brand-dark/10 hover:bg-brand-light/20 dark:hover:bg-brand-dark/20 transition-colors border border-brand-light/10 dark:border-brand-dark/10">
                        <div className="size-10 rounded-full bg-brand-light dark:bg-brand-dark flex items-center justify-center text-white dark:text-black group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[20px]">upload</span>
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-zinc-900 dark:text-white">Importar</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Excel / CSV</p>
                        </div>
                     </button>
                     <button onClick={() => navigate('/budget')} className="group flex items-center gap-3 p-4 rounded-2xl bg-surface-light dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors border border-gray-200 dark:border-zinc-800">
                        <div className="size-10 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[20px]">analytics</span>
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-zinc-900 dark:text-white">Análisis</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Ver gastos</p>
                        </div>
                     </button>
                </section>

                {/* Transactions List */}
                <section className="px-6 pb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Actividad</h3>
                        <Link to="/import" className="size-8 rounded-full border border-gray-200 dark:border-zinc-700 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        {userData.transactions.slice(0, 5).map((tx, idx) => (
                            <div key={tx.id} className="group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-surface-dark border border-transparent hover:border-gray-200 dark:hover:border-zinc-700 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                                        tx.amount > 0 
                                            ? 'bg-brand-dark/20 text-green-700 dark:text-brand-dark' 
                                            : 'bg-surface-light dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white'
                                    }`}>
                                        <span className="material-symbols-outlined text-[24px]">
                                            {tx.category === 'Alimentación' ? 'fastfood' : 
                                             tx.category === 'Transporte' ? 'directions_car' :
                                             tx.isFixed ? 'calendar_today' : 'shopping_bag'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-zinc-900 dark:text-white">{tx.description}</p>
                                        <p className="text-xs text-gray-500 font-medium">{tx.category} • {tx.date}</p>
                                    </div>
                                </div>
                                <span className={`text-sm font-bold font-mono ${tx.amount > 0 ? 'text-green-600 dark:text-brand-dark' : 'text-zinc-900 dark:text-white'}`}>
                                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <BottomNav />
        </div>
    );
};

export default Dashboard;