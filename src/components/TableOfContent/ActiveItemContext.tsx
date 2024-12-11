import React, { createContext, useContext, useState, ReactNode } from "react";

interface ActiveItemContextType {
  activePath: string | null;
  setActivePath: (id: string | null) => void;
}

const activeItemContext = createContext<ActiveItemContextType | null>(null);

export const ActiveItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePath, setActivePath] = useState<string | null>(null);

  return (
    <activeItemContext.Provider value={{ activePath, setActivePath }}>
      {children}
    </activeItemContext.Provider>
  );
};

export const useActiveItemContext = (): ActiveItemContextType => {
  const context = useContext(activeItemContext);

  if (!context) {
    throw new Error("useActiveItemContext call must be used within a ActiveItemProvider");
  }

  return context;
};
