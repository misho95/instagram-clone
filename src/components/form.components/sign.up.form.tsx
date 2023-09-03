import Input from "./input";
import fbIcon from "../../assets/images/cropped-FB-Icon-1.png";
import { useState, useEffect } from "react";
import { FormEvent } from "react";
import { getRealTimeCollectionAndSetIt } from "../../utils/helper.script";

interface PropsType {
  submitHandler: (
    userName: string,
    fullName: string,
    email: string,
    pass: string
  ) => void;
  signUpFormError: string | null;
}

const SignUpForm = ({ submitHandler, signUpFormError }: PropsType) => {
  const [usersData, setUsersData] = useState<string[] | null>(null);
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [fullNameError, setFullNameError] = useState<null | string>(null);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<null | string>(null);
  const [pass, setPass] = useState<string>("");
  const [passError, setPassError] = useState<string | null>(null);
  const [rePass, setRePass] = useState<string>("");
  const [rePassError, setRePassError] = useState<null | string>(null);
  const [save, setSave] = useState<boolean>(false);
  const [userTrue, setUserTrue] = useState<boolean | null>(null);

  const waitServerToGetUserData = async () => {
    await getRealTimeCollectionAndSetIt("users", setUsersData);
  };

  useEffect(() => {
    waitServerToGetUserData();
  }, []);

  useEffect(() => {
    if (userName !== "") {
      const checkUserName = usersData?.find((usr) => {
        if (usr === userName) return usr;
      });
      if (checkUserName) {
        setUserTrue(false);
      } else {
        setUserTrue(true);
      }
    } else {
      setUserTrue(null);
    }
  }, [userName]);

  const submitData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userTrue) {
      return;
    }

    if (userName === "") {
      setUserNameError("Please Fill The Field");
      return;
    } else {
      setUserNameError(null);
    }

    if (fullName === "") {
      setFullNameError("Please Fill The Field");
      return;
    } else {
      setFullNameError(null);
    }

    if (email === "") {
      setEmailError("Please Fill The Field");
      return;
    } else {
      setEmailError(null);
    }

    if (pass === "") {
      setPassError("Please Fill The Field");
      return;
    } else {
      setPassError(null);
    }

    if (rePass === "") {
      setRePassError("Please Fill The Field");
      return;
    } else {
      setRePassError(null);
    }

    if (pass !== rePass) {
      setPassError("PassWord's do not match");
      return;
    } else {
      setPassError(null);
    }

    submitHandler(userName, fullName, email, pass);
  };

  return (
    <form
      onSubmit={submitData}
      className="flex flex-col gap-5 p-5 w-full sm:w-80 sm:border-px1 border-gray-300 items-center"
    >
      <h1 className="text-2xl font-bold text-center">Instagram</h1>
      <label className="w-full">
        <Input
          type="text"
          placeholder="Username"
          value={userName}
          set={setUserName}
        />
        {userTrue !== null && (
          <div>
            {userTrue ? (
              <div className="text-green-500">Avalable</div>
            ) : (
              <div className="text-red-500">Already Used</div>
            )}
          </div>
        )}
        {userNameError && (
          <div className="text-xs text-red-500 p-1">{userNameError}</div>
        )}
      </label>
      <label className="w-full">
        <Input
          type="text"
          placeholder="Full name"
          value={fullName}
          set={setFullName}
        />
        {fullNameError && (
          <div className="text-xs text-red-500 p-1">{fullNameError}</div>
        )}
      </label>
      <label className="w-full">
        <Input type="email" placeholder="Email" value={email} set={setEmail} />
        {emailError && (
          <div className="text-xs text-red-500 p-1">{emailError}</div>
        )}
      </label>
      <label className="w-full">
        <Input
          type="password"
          placeholder="Password"
          value={pass}
          set={setPass}
        />
        {passError && (
          <div className="text-xs text-red-500 p-1">{passError}</div>
        )}
      </label>
      <label className="w-full">
        <Input
          type="password"
          placeholder="Re-Password"
          value={rePass}
          set={setRePass}
        />
        {rePassError && (
          <div className="text-xs text-red-500 p-1">{rePassError}</div>
        )}
      </label>
      {signUpFormError && (
        <div className="text-red-500 text-sm">{signUpFormError}</div>
      )}
      <label className="text-xs flex gap-3 items-center w-fit">
        <input type="checkbox" checked={save} onChange={() => setSave(!save)} />{" "}
        Save login info
      </label>
      <button
        type="submit"
        className="bg-sky-500 text-gray-100 p-1 rounded-lg font-semibold w-full"
      >
        Log in
      </button>
      <div className="bg-gray-400 h-px1 relative w-full">
        <span className="absolute left-1/2 -translate-x-1/2 -top-4 bg-gray-100 p-2 px-8 text-sm">
          OR
        </span>
      </div>
      <button
        type="button"
        className="flex gap-2 justify-center items-center text-sm text-blue-800 w-fit"
      >
        <img src={fbIcon} className="w-6 h-6" />
        Log in with Facebook
      </button>
      <button type="button" className="text-sm">
        Forgot password?
      </button>
    </form>
  );
};

export default SignUpForm;
