import React, { useId, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input as AntdInput } from 'antd';


function Input({ name, label, type = "text", className = "", error, rules,...props }) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const { control } = useFormContext();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`block mb-1 font-medium ${error ? "text-red-500" : "text-gray-700"}`}
        >
          {label}
        </label>
      )}
      {/* Using Controller to integrate with react-hook-form */}
      <Controller
        name={name}
        control={control}
        rules={rules || { required: `${label} is required` }}
        defaultValue=""
        render={({ field }) => (
          <AntdInput
            id={id}
            type={type}
            {...field}
            status={error ? "error" : ""}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              field.onBlur(e);
            }}
            className={className}
            {...props}
          />
        )}
      />
      {/* Display error message if exists */}

      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error.message || error}
        </p>
      )}
    </div>
  );
}


export default Input;
