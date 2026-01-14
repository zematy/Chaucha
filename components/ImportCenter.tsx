import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ImportCenter: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-zinc-900 dark:text-white flex flex-col min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
                <Link to="/" className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold">Importación</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 flex flex-col w-full max-w-md mx-auto p-6 gap-8 pb-24">
                {/* Upload Zone */}
                <section>
                    <div className="group relative flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-gray-300 dark:border-zinc-700 bg-surface-light dark:bg-surface-dark px-6 py-12 transition-all hover:border-brand-light dark:hover:border-brand-dark hover:bg-white dark:hover:bg-zinc-900">
                        <div className="flex size-16 items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-lg group-hover:scale-110 transition-transform text-brand-light dark:text-brand-dark">
                            <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                        </div>
                        <div className="text-center space-y-1">
                            <p className="text-lg font-bold">Sube tu cartola</p>
                            <p className="text-sm text-gray-500">Excel (.xlsx) o CSV</p>
                        </div>
                        <button className="mt-4 px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-sm shadow-lg hover:opacity-90 transition-opacity">
                            Seleccionar Archivo
                        </button>
                    </div>
                </section>

                {/* Progress */}
                <section className="flex justify-between items-center px-4">
                     <div className="flex flex-col items-center gap-2">
                        <div className="size-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm font-bold">check</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-500">Carga</span>
                     </div>
                     <div className="h-[2px] flex-1 bg-gray-200 dark:bg-zinc-800 mx-2"></div>
                     <div className="flex flex-col items-center gap-2">
                        <div className="size-10 rounded-full bg-brand-light dark:bg-brand-dark text-white dark:text-black flex items-center justify-center shadow-lg shadow-brand-light/30 dark:shadow-brand-dark/30 relative">
                             <div className="absolute inset-0 rounded-full border border-current animate-ping opacity-30"></div>
                            <span className="material-symbols-outlined text-xl">psychology</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-light dark:text-brand-dark">IA</span>
                     </div>
                     <div className="h-[2px] flex-1 bg-gray-200 dark:bg-zinc-800 mx-2"></div>
                     <div className="flex flex-col items-center gap-2 opacity-50">
                        <div className="size-8 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center">
                            <span className="text-xs font-bold">3</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Fin</span>
                     </div>
                </section>

                {/* Data Preview */}
                <section className="bg-white dark:bg-surface-dark rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-gray-100 dark:border-zinc-800 bg-surface-light/50 dark:bg-zinc-900/50">
                        <h3 className="font-bold text-sm">Vista Previa de Datos</h3>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-zinc-800 text-xs">
                         <div className="grid grid-cols-3 p-3 gap-2">
                            <span className="text-gray-500">12/10</span>
                            <span className="font-bold truncate">Starbucks</span>
                            <span className="text-right text-red-500 font-mono">-$4.500</span>
                         </div>
                         <div className="grid grid-cols-3 p-3 gap-2">
                            <span className="text-gray-500">13/10</span>
                            <span className="font-bold truncate">Uber Trip</span>
                            <span className="text-right text-red-500 font-mono">-$8.200</span>
                         </div>
                    </div>
                </section>
            </main>

            <footer className="fixed bottom-0 left-0 w-full p-6 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-gray-100 dark:border-zinc-800">
                <div className="max-w-md mx-auto">
                    <button onClick={() => navigate('/mentor')} className="w-full h-14 bg-brand-light dark:bg-brand-dark text-white dark:text-black rounded-2xl font-bold text-lg shadow-xl shadow-brand-light/20 dark:shadow-brand-dark/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                        <span>Procesar con IA</span>
                        <span className="material-symbols-outlined">auto_awesome</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ImportCenter;