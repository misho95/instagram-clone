import Input from "./input";
import fbIcon from "../../assets/images/cropped-FB-Icon-1.png";
import { useState } from "react";
import { FormEvent } from "react";

interface PropsType {
  submitHandler: (login: string, pass: string, save: boolean) => void;
  singInFormError: string | null;
}

const Form = ({ submitHandler, singInFormError }: PropsType) => {
  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [pass, setPass] = useState<string>("");
  const [passError, setPassError] = useState<string | null>(null);
  const [save, setSave] = useState<boolean>(false);

  const submitData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (login === "") {
      setLoginError("Please Fill The Field");
    } else {
      setLoginError(null);
    }

    if (pass === "") {
      setPassError("Please Fill The Field");
    } else {
      setPassError(null);
    }

    if (loginError === null && passError === null) {
      submitHandler(login, pass, save);
    }
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
          placeholder="Phone number, username, or email"
          value={login}
          set={setLogin}
        />
        {loginError && (
          <div className="text-xs text-red-500 p-1">{loginError}</div>
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
      {singInFormError && (
        <div className="text-red-500 text-sm">{singInFormError}</div>
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

export default Form;
