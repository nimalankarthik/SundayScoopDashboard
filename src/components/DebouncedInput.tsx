import React, { useEffect, useState, ChangeEvent } from "react";

interface DebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
  [x: string]: any;
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value: initValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState<string>(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};

export default DebouncedInput;
