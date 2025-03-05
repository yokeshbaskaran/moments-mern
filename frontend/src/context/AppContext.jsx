import { useState } from "react";
import { createContext, useContext } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);

  const contextValues = { userData };

  return (
    <>
      <AppContext.Provider value={contextValues}>
        {children}
      </AppContext.Provider>
    </>
  );
};
