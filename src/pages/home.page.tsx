import { Link } from "react-router-dom";
import LeftNavBar from "../components/home.components/leftNavBar";

const HomePage = () => {
  return (
    <div className="flex">
      <LeftNavBar />
      Home Page<Link to="/signin">SignIn</Link>
    </div>
  );
};

export default HomePage;
