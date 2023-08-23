import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      Home Page<Link to="/signin">SignIn</Link>
    </div>
  );
};

export default HomePage;
