const InputField = ({
    label,
    name,
    value,
    onChange,
  }: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-black">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="py-2 border-b-2 border-primary focus:outline-none focus:ring-0"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );

  export default InputField;