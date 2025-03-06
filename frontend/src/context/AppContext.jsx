import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import Cookies from "js-cookie";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export const API_URL = import.meta.env.VITE_SERVER_URL;
// console.log(API_URL);

export const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    const myCookie = Cookies.get("access_token");

    if (myCookie) {
      getUserDetails();
    }
  }, []);

  const getUserDetails = async () => {
    const response = await axios.get(API_URL + "/profile", {
      withCredentials: true,
    });

    if (response) {
      console.log("response data", response.data);
      setUserData(response.data);
    }
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    setUserData([]);
  };

  const contextValues = { userData, setUserData, getUserDetails, handleLogout };

  return (
    <>
      <AppContext.Provider value={contextValues}>
        {children}
      </AppContext.Provider>
    </>
  );
};
