import React, { createContext, useState, useCallback, useContext } from 'react';

export const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((msg, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [{ id, msg, type }, ...prev]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => {
          const icons = { success: '✅', danger: '🚨', info: 'ℹ️' };
          return (
            <div key={t.id} className={`toast ${t.type}`}>
              <span>{icons[t.type] || '·'}</span><span>{t.msg}</span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
