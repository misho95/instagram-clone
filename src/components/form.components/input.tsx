interface PropsType {
  type: string;
  placeholder: string;
  value: string;
  set: (arg0: string) => void;
}

const Input = ({ type, placeholder, value, set }: PropsType) => {
  return (
    <input
      value={value}
      onChange={(e) => set(e.target.value)}
      type={type}
      placeholder={placeholder}
      className="px-1 py-2 w-full bg-gray-200/30 border-px1 border-gray-200"
    />
  );
};

export default Input;
