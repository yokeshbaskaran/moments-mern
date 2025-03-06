import AddItem from "../components/AddItem";
import Box from "../components/Box";
import { useAppContext } from "../context/AppContext";
import Cards from "../pages/Cards";

const Home = () => {
  const { userData } = useAppContext();

  return (
    <div className="my-5 py-2">
      {userData.firstname ? <AddItem /> : <Box />}

      <Cards />
    </div>
  );
};

export default Home;
