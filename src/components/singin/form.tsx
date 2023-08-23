import Input from "./input";

const Form = () => {
  return (
    <form className="flex flex-col gap-5 p-5 w-80">
      <h1 className="text-2xl font-bold text-center">Instagram</h1>
      <label>
        <Input type="text" placeholder="Phone number, username, or email" />
      </label>
      <label>
        <Input type="password" placeholder="Password" />
      </label>
      <label className="text-xs flex gap-3 items-center">
        <input type="checkbox" /> Save login info
      </label>
      <button
        type="submit"
        className="bg-sky-500 text-gray-100 p-1 rounded-lg font-semibold"
      >
        Log in
      </button>
      <div className="bg-gray-400 h-px1 relative">
        <span className="absolute left-1/2 -translate-x-1/2 -top-5 bg-gray-100 p-2 px-8">
          OR
        </span>
      </div>
      <button type="button">Log in with Facebook</button>
      <button type="button">Forgot password?</button>
    </form>
  );
};

export default Form;
