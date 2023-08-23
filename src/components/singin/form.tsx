import Input from "./input";
import fbIcon from "../../assets/images/cropped-FB-Icon-1.png";

const Form = () => {
  return (
    <form className="flex flex-col gap-5 p-5 w-full sm:w-80 sm:border-px1 border-gray-300 items-center">
      <h1 className="text-2xl font-bold text-center">Instagram</h1>
      <label className="w-full">
        <Input type="text" placeholder="Phone number, username, or email" />
      </label>
      <label className="w-full">
        <Input type="password" placeholder="Password" />
      </label>
      <label className="text-xs flex gap-3 items-center w-fit">
        <input type="checkbox" /> Save login info
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
