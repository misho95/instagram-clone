const Input = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="px-1 py-2 w-full bg-gray-200/30 border-px1 border-gray-200"
    />
  );
};

export default Input;
