import React, { createContext, useContext, useState } from 'react';

const DrugsContext = createContext();

export function DrugsProvider({ children }) {
  const [allDrugs, setAllDrugs] = useState([]);

  const toggleAddToCart = (drugId) => {
    setAllDrugs(prevDrugs =>
      prevDrugs.map(drug =>
        drug.medid === drugId
          ? { ...drug, addToCart: !drug.addToCart }
          : drug
      )
    );
  };

  return (
    <DrugsContext.Provider value={{ allDrugs, setAllDrugs, toggleAddToCart }}>
      {children}
    </DrugsContext.Provider>
  );
}

export function useDrugsContext() {
  const context = useContext(DrugsContext);
  if (!context) {
    throw new Error('useDrugsContext must be used within a DrugsProvider');
  }
  return context;
}