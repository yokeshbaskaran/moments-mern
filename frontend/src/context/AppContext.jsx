import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export const API_URL = import.meta.env.VITE_SERVER_URL;
// console.log(API_URL);

export const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);

  // useEffect(() => {}, [!dataChanged]);

  const getUserDetails = () => {};

  const contextValues = { userData, setUserData };

  return (
    <>
      <AppContext.Provider value={contextValues}>
        {children}
      </AppContext.Provider>
    </>
  );
};
