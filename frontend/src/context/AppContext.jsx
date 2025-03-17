import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import Cookies from "js-cookie";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

// export const API_URL = "http://localhost:3005/api";
export const API_URL = "https://moments-of-photos.onrender.com/api";
// console.log(API_URL);

export const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    const myCookie = Cookies.get("access_token");

    if (myCookie) {
      getUserDetails();
      fetchPosts();
    }
  }, [dataChanged]);

  const getUserDetails = async () => {
    const response = await axios.get(API_URL + "/profile", {
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = response.data;
      // console.log("data", data);
      setUserData(data);
    }
  };

  const fetchPosts = async () => {
    const response = await axios.get(API_URL + "/posts");

    if (response) {
      const { data } = response;
      // console.log(data);
      setPosts(data);
    } else {
      console.log("Cannot fetch posts");
    }
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    setUserData([]);
  };

  const contextValues = {
    userData,
    setUserData,
    dataChanged,
    setDataChanged,
    getUserDetails,
    posts,
    fetchPosts,
    handleLogout,
  };

  return (
    <>
      <AppContext.Provider value={contextValues}>
        {children}
      </AppContext.Provider>
    </>
  );
};
