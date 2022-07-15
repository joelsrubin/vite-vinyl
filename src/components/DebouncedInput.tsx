import * as React from "react";

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  error = null,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
  error?: Error | null;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <>
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        spellCheck={false}
        autoFocus
      />
      {error && (
        <div className="text-red-500 font-mono text-sm mt-4">
          {error.message}
        </div>
      )}
    </>
  );
}
