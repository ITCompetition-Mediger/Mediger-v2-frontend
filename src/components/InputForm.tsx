import React from 'react';

interface InputFormProps {
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  tip?: string;
  error?: string;
}

function InputForm(props: InputFormProps) {
  const inputBorderClass = props.error ? 'border-red' : 'border-black-400';

  return (
    <div className="flex flex-col justify-start mb-8">
      <label className="text-sm text-black-400">{props.label}</label>
      <input
        type={props.type}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={`p-4 my-1 w-96 focus:outline-none placeholder:text-black-400 text-black-800 border-b-2 focus:border-main-color-500 ${inputBorderClass} transition-colors duration-600`}
      />

      {props.tip && (
        <p className="text-sm text-black-400">
          <span className="text-main-color-500">Tip! </span>
          {props.tip}
        </p>
      )}

      {props.error && <p className="text-sm text-red">{props.error}</p>}
    </div>
  );
}

export default InputForm;
