import { Link } from "react-router-dom";
import MobileSide from "../components/singin/mobile.side";
import Form from "../components/singin/form";

const SignUp = () => {
  return (
    <div className="bg-gray-100 w-full min-h-screen flex flex-col gap-20 sm:justify-center items-center sm:p-10">
      <div className="flex gap-8 w-full sm:w-fit p-10 sm:p-0">
        <div className="flex flex-col gap-2 w-full">
          <Form />
          <div className="sm:border-px1 border-gray-300 p-4">
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="flex flex-wrap justify-center gap-3 text-gray-400 text-sm">
          <a href="#">Meta</a>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Jobs</a>
          <a href="#">Help</a>
          <a href="#">API</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Top Accounts</a>
          <a href="#">Locations</a>
          <a href="#">Instagram Lite</a>
          <a href="#">Threads</a>
          <a href="#">Contact Uploading & Non-Users</a>
          <a href="#">Meta Verifed</a>
        </div>
        <div className="text-gray-400 text-sm flex gap-5">
          <select>
            <option>English</option>
          </select>
          © 2023 Instagram from Meta
        </div>
      </div>
    </div>
  );
};

export default SignUp;
