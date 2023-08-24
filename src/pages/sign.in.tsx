import { Link } from "react-router-dom";
import Form from "../components/singin/form";
import MobileSide from "../components/singin/mobile.side";
import { authWithEmailandPass } from "../utils/firebase";
import { useState } from "react";

const SignIn = () => {
  const [singInError, setSignInError] = useState<null | string>(null);
  const submitForm = async (login: string, pass: string, save: boolean) => {
    try {
      const { user } = await authWithEmailandPass(login, pass);
      console.log(user);
      console.log(save);
      setSignInError(null);
    } catch (error) {
      if (error instanceof Error) {
        setSignInError((error as Error).message);
      } else {
        setSignInError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="bg-gray-100 w-full min-h-screen flex flex-col gap-20 sm:justify-center items-center sm:p-10">
      <div className="flex gap-8 w-full sm:w-fit p-10 sm:p-0">
        <div className="hidden sm:flex">
          <MobileSide />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Form submitHandler={submitForm} singInFormError={singInError} />
          <div className="sm:border-px1 border-gray-300 p-4">
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Sign up
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

export default SignIn;
