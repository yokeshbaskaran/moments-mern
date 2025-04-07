import "./App.css";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { lazy, Suspense } from "react";
import Loader from "./utlis/Loader";
const Header = lazy(() => import("./components/Header"));

const Home = lazy(() => import("./pages/Home"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const App = () => {
  return (
    <>
      <AppContextProvider>
        <Suspense fallback={<Loader />}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="auth" element={<AuthPage />} />
          </Routes>
          <Footer />
        </Suspense>
      </AppContextProvider>
    </>
  );
};

export default App;
