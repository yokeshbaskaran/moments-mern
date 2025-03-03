import AddItem from "../components/AddItem";
import Box from "../components/Box";
import Cards from "../pages/Cards";

const Home = () => {
  return (
    <div className="my-5 py-2">
      <Box />
      <AddItem />
      <Cards />
    </div>
  );
};

export default Home;
