import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFormProps {
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  tip?: string;
  error?: string | null;
  register?: UseFormRegisterReturn;
  disabled?: boolean;
}

function InputForm({
  label,
  type,
  placeholder,
  value,
  tip,
  error,
  register,
  disabled,
}: InputFormProps) {
  const inputBorderClass = error
    ? 'border-red-500 focus:bg-red-100 focus:border-red-500'
    : 'border-black-400';

  return (
    <div className="flex flex-col justify-start mb-8">
      <label className="text-sm text-black-400">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={`p-4 my-1 w-96 focus:outline-none placeholder:text-black-400 text-black-800 border-b-2 focus:bg-black-50 focus:border-main-color-500 ${inputBorderClass} transition-colors duration-600`}
        {...register}
        autoComplete="off"
        disabled={disabled}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      {tip && (
        <p className="text-sm text-black-400">
          <span className="text-main-color-500">Tip! </span>
          {tip}
        </p>
      )}
    </div>
  );
}

export default InputForm;
