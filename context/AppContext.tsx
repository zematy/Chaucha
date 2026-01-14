import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Tipos de Datos ---

export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
  icon: string;
  paid: boolean;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  type: 'savings' | 'investment' | 'purchase'; // Ahorro (Colchón), Inversión, Compra (Auto, Viaje)
  icon: string;
  deadline?: string;
  color: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number; // Negativo para gasto
  category: string; // 'Alimentación', 'Transporte', 'Ocio', etc.
  isFixed: boolean; // Si es parte de un gasto fijo
}

export interface UserData {
  name: string;
  monthlyIncome: number;
  currentBalance: number;
  creditCardUsed: number;
  creditCardLimit: number;
  fixedExpenses: FixedExpense[];
  goals: Goal[];
  transactions: Transaction[];
  isConfigured: boolean;
}

interface AppContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  toggleExpensePaid: (id: string) => void;
  addGoal: (goal: Goal) => void;
  updateGoalAmount: (id: string, amount: number) => void;
  resetApp: () => void;
  getVariableExpenses: () => { category: string; amount: number; percentage: number }[];
}

// --- Datos Iniciales y Mock ---

const defaultTransactions: Transaction[] = [
  { id: 't1', date: '2023-10-20', description: 'Uber Eats', amount: -12500, category: 'Alimentación', isFixed: false },
  { id: 't2', date: '2023-10-19', description: 'Starbucks', amount: -4200, category: 'Ocio', isFixed: false },
  { id: 't3', date: '2023-10-18', description: 'Jumbo', amount: -45000, category: 'Alimentación', isFixed: false },
  { id: 't4', date: '2023-10-18', description: 'Copec', amount: -25000, category: 'Transporte', isFixed: false },
  { id: 't5', date: '2023-10-15', description: 'Netflix', amount: -8500, category: 'Entretenimiento', isFixed: true },
  { id: 't6', date: '2023-10-12', description: 'Zara', amount: -35990, category: 'Compras', isFixed: false },
  { id: 't7', date: '2023-10-10', description: 'Farmacia Cruz Verde', amount: -12990, category: 'Salud', isFixed: false },
];

const defaultData: UserData = {
  name: '',
  monthlyIncome: 0,
  currentBalance: 0,
  creditCardUsed: 0,
  creditCardLimit: 0,
  fixedExpenses: [],
  goals: [], // Se llenará en la sección de Metas
  transactions: defaultTransactions,
  isConfigured: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    const saved = localStorage.getItem('chaucha_data_v2');
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('chaucha_data_v2', JSON.stringify(userData));
  }, [userData]);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const toggleExpensePaid = (id: string) => {
    setUserData(prev => ({
      ...prev,
      fixedExpenses: prev.fixedExpenses.map(exp => 
        exp.id === id ? { ...exp, paid: !exp.paid } : exp
      )
    }));
  };

  const addGoal = (goal: Goal) => {
    setUserData(prev => ({ ...prev, goals: [...prev.goals, goal] }));
  };

  const updateGoalAmount = (id: string, amountToAdd: number) => {
    setUserData(prev => ({
      ...prev,
      goals: prev.goals.map(g => 
        g.id === id ? { ...g, currentAmount: Math.min(g.currentAmount + amountToAdd, g.targetAmount) } : g
      )
    }));
  };

  const resetApp = () => {
    setUserData(defaultData);
    localStorage.removeItem('chaucha_data_v2');
  };

  // Calcular gastos variables agrupados por categoría desde las transacciones
  const getVariableExpenses = () => {
    const variables = userData.transactions.filter(t => !t.isFixed && t.amount < 0);
    const grouped: Record<string, number> = {};
    let totalVariable = 0;

    variables.forEach(t => {
      const amount = Math.abs(t.amount);
      grouped[t.category] = (grouped[t.category] || 0) + amount;
      totalVariable += amount;
    });

    return Object.entries(grouped)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalVariable > 0 ? (amount / totalVariable) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  return (
    <AppContext.Provider value={{ 
      userData, 
      updateUserData, 
      toggleExpensePaid, 
      addGoal, 
      updateGoalAmount, 
      resetApp,
      getVariableExpenses
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
