import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Settings: React.FC = () => {
    const { userData, resetApp } = useApp();
    const location = useLocation();

    const SettingRow = ({ icon, title, value, onClick, danger }: { icon: string, title: string, value?: string, onClick?: () => void, danger?: boolean }) => (
        <div onClick={onClick} className={`flex items-center justify-between p-5 bg-white dark:bg-surface-dark rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-zinc-700 transition-all cursor-pointer group ${danger ? 'bg-red-50 dark:bg-red-900/10' : ''}`}>
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${danger ? 'text-accent-rose' : 'bg-surface-light dark:bg-zinc-800 text-zinc-900 dark:text-white'}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                <span className={`font-bold ${danger ? 'text-accent-rose' : 'text-zinc-900 dark:text-white'}`}>{title}</span>
            </div>
            {value && <span className="text-gray-400 font-medium text-sm">{value}</span>}
            {!value && <span className={`material-symbols-outlined text-gray-300 ${danger ? 'text-red-300' : 'group-hover:text-zinc-900 dark:group-hover:text-white'} transition-colors`}>chevron_right</span>}
        </div>
    );

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
                 <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tighter">Ajustes</h1>
                 <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Preferencias y sistema</p>
            </header>

            <main className="flex-1 px-6 space-y-8">
                
                <section className="space-y-3">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">General</h2>
                    <SettingRow icon="person" title="Nombre" value={userData.name} />
                    <SettingRow icon="payments" title="Moneda Principal" value="CLP ($)" />
                    <SettingRow icon="notifications" title="Notificaciones" value="Activadas" />
                </section>

                <section className="space-y-3">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Privacidad</h2>
                    <SettingRow icon="fingerprint" title="Biometría" />
                    <SettingRow icon="encrypted" title="Cifrado de Datos" value="Activo" />
                </section>

                <section className="space-y-3">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Zona de Peligro</h2>
                    <SettingRow 
                        icon="restart_alt" 
                        title="Reiniciar Aplicación" 
                        danger 
                        onClick={() => {
                            if(window.confirm('¿Deseas reiniciar la aplicación a su estado original?')) {
                                resetApp();
                                window.location.href = '/';
                            }
                        }}
                    />
                </section>

                <div className="pt-4 text-center">
                    <p className="text-xs font-mono text-gray-300 dark:text-zinc-700">Chaucha v1.2 • Build 2024.10</p>
                </div>

            </main>
            <BottomNav />
        </div>
    );
};

export default Settings;