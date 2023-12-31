import { Link } from "react-router-dom";
import SignUpForm from "../components/form.components/sign.up.form";
import {
  createUserWithEmailandPass,
  addNewDataInServerStorage,
} from "../utils/firebase";
import { useState } from "react";
import LoadingComponent from "../components/loading.component";

const SignUp = () => {
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signUpNewUser = async (
    userName: string,
    fullName: string,
    email: string,
    pass: string
  ) => {
    try {
      setLoading(true);
      const { user } = await createUserWithEmailandPass(email, pass);
      setSignUpError(null);
      if (user) {
        const data = new Date();
        await addNewDataInServerStorage("users", user.uid, {
          id: user.uid,
          userName,
          fullName,
          email,
          pass,
          singUpDate: data,
          avatar: "",
          following: [],
          followers: [],
          userActive: false,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setSignUpError((error as Error).message);
      } else {
        setSignUpError("An unknown error occurred.");
      }
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="bg-gray-100 w-full min-h-screen flex flex-col gap-20 sm:justify-center items-center sm:p-10">
      <div className="flex gap-8 w-full sm:w-fit p-10 sm:p-0">
        <div className="flex flex-col gap-2 w-full">
          <SignUpForm
            submitHandler={signUpNewUser}
            signUpFormError={signUpError}
          />
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
