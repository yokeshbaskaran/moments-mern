import "./App.css";
import AddItem from "./components/AddItem";
import Box from "./components/Box";
import Cards from "./components/Cards";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Box />
      <AddItem />
      <Cards />
    </div>
  );
};

export default App;
