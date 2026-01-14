import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, FixedExpense } from '../context/AppContext';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData } = useApp();
  const [step, setStep] = useState(1);

  // Form States
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');
  const [balance, setBalance] = useState('');
  const [ccUsed, setCcUsed] = useState('');
  const [ccLimit, setCcLimit] = useState('');
  
  const [expenses, setExpenses] = useState<FixedExpense[]>([
    { id: '1', name: 'Arriendo', amount: 450000, icon: 'home', paid: false },
    { id: '2', name: 'Plan Celular', amount: 15000, icon: 'smartphone', paid: false },
  ]);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  const handleNext = () => setStep(prev => prev + 1);

  const handleAddExpense = () => {
    if (!newExpenseName || !newExpenseAmount) return;
    const newExp: FixedExpense = {
      id: Date.now().toString(),
      name: newExpenseName,
      amount: parseInt(newExpenseAmount) || 0,
      icon: 'receipt_long',
      paid: false
    };
    setExpenses([...expenses, newExp]);
    setNewExpenseName('');
    setNewExpenseAmount('');
  };

  const handleFinish = () => {
    updateUserData({
      name,
      monthlyIncome: parseInt(income) || 0,
      currentBalance: parseInt(balance) || 0,
      creditCardUsed: parseInt(ccUsed) || 0,
      creditCardLimit: parseInt(ccLimit) || 0,
      fixedExpenses: expenses,
      isConfigured: true
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col p-8 transition-colors duration-300">
      
      {/* Step Indicator */}
      <div className="flex gap-2 mb-12 mt-4">
        {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-black dark:bg-white' : 'bg-gray-200 dark:bg-zinc-800'}`}></div>
        ))}
      </div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tighter">Bienvenido.</h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 font-medium leading-relaxed">Empecemos por lo básico para calibrar tu brújula financiera.</p>
            
            <div className="space-y-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Nombre</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-200 dark:border-zinc-800 py-4 text-3xl font-bold focus:border-brand-light dark:focus:border-brand-dark focus:outline-none dark:text-white transition-colors placeholder-gray-300 dark:placeholder-zinc-700"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Ingreso Mensual</label>
                <input 
                    type="number" 
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-gray-200 dark:border-zinc-800 py-4 text-3xl font-bold focus:border-brand-light dark:focus:border-brand-dark focus:outline-none dark:text-white transition-colors placeholder-gray-300 dark:placeholder-zinc-700"
                    placeholder="$0"
                  />
              </div>
            </div>
            
            <button 
              onClick={handleNext}
              disabled={!name || !income}
              className="mt-16 w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all"
            >
              Continuar
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tighter">Saldos.</h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 font-medium">¿Cuál es tu estado actual?</p>
            
            <div className="space-y-6">
              <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-3xl border border-gray-200 dark:border-zinc-800">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Saldo Cuenta Corriente</label>
                <input 
                  type="number" 
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-3xl font-bold focus:ring-0 dark:text-white placeholder-gray-300 dark:placeholder-zinc-700"
                  placeholder="$0"
                />
              </div>

              <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-3xl border border-gray-200 dark:border-zinc-800">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Deuda Tarjeta Crédito</label>
                <input 
                  type="number" 
                  value={ccUsed}
                  onChange={(e) => setCcUsed(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-3xl font-bold focus:ring-0 text-accent-rose placeholder-red-200"
                  placeholder="$0"
                />
                 <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Cupo Total</label>
                    <input 
                        type="number" 
                        value={ccLimit}
                        onChange={(e) => setCcLimit(e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-lg font-medium focus:ring-0 dark:text-white"
                        placeholder="Ej: 1000000"
                    />
                 </div>
              </div>
            </div>
            
            <button 
              onClick={handleNext}
              disabled={!balance}
              className="mt-12 w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] disabled:opacity-50 transition-all"
            >
              Siguiente
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col h-full">
            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-2 tracking-tighter">Fijos.</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Gastos recurrentes mensuales.</p>
            
            <div className="flex-1 space-y-3 mb-6 overflow-y-auto">
              {expenses.map((exp) => (
                <div key={exp.id} className="flex items-center justify-between bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-zinc-800">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-gray-400">{exp.icon}</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{exp.name}</span>
                  </div>
                  <span className="font-mono text-gray-500 dark:text-gray-400">${exp.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-3xl border border-gray-200 dark:border-zinc-800 mb-6">
                <div className="flex gap-2 mb-2">
                    <input 
                        value={newExpenseName}
                        onChange={(e) => setNewExpenseName(e.target.value)}
                        placeholder="Nombre" 
                        className="flex-1 bg-transparent border-b border-gray-300 dark:border-zinc-700 p-2 focus:outline-none dark:text-white"
                    />
                     <input 
                        type="number"
                        value={newExpenseAmount}
                        onChange={(e) => setNewExpenseAmount(e.target.value)}
                        placeholder="Monto" 
                        className="w-24 bg-transparent border-b border-gray-300 dark:border-zinc-700 p-2 focus:outline-none dark:text-white"
                    />
                </div>
                <button onClick={handleAddExpense} disabled={!newExpenseName} className="w-full py-3 bg-gray-200 dark:bg-zinc-800 rounded-xl font-bold text-sm text-gray-600 dark:text-gray-300">
                    + Agregar
                </button>
            </div>
            
            <button 
              onClick={handleFinish}
              className="w-full bg-brand-light dark:bg-brand-dark text-white dark:text-black py-5 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] transition-all"
            >
              Comenzar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;