import { createContext, useState, useContext, ReactNode } from 'react';

interface StockContextType {
  stock: Record<number, number>; // Maps product ID to stock quantity
  setStock: (productId: number, quantity: number) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider = ({ children }: { children: ReactNode }) => {
  const [stock, setStockState] = useState<Record<number, number>>({});

  const setStock = (productId: number, quantity: number) => {
    setStockState((prevStock) => ({
      ...prevStock,
      [productId]: quantity,
    }));
  };

  return (
    <StockContext.Provider value={{ stock, setStock }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};
