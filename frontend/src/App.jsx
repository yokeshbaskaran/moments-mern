import "./App.css";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import { AppContextProvider } from "./context/AppContext";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetch data)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // if (loading) {
  //   return (
  //     <>
  //       <Header />
  //       <Loader />
  //     </>
  //   );
  // }

  return (
    <AppContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth" element={<AuthPage />} />
      </Routes>
      <Footer />
    </AppContextProvider>
  );
};

export default App;
