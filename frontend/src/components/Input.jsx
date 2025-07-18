import React, { useId,useState } from "react";

const Input = React.forwardRef(function Input(
    
    {
        label,
        type = "text",
        className = "",
        error,
        ...props

    }, ref) {
    const id = useId();
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="w-full">
            {label &&
                <label
                    className={`inline-block ${error ? "text-red-500" : "text-gray-400"} ${isFocused ? "text-red-500": "text-gray-400"} `}
                    htmlFor={id}
                >
                    {label}
                </label>
            }
            <input
                type={type}
                className={`
                    px-3 py-2 border outline-none focus:bg-red-50 focus:border-red-500 duration-200 
                    text-black rounded-sm block w-full
                    ${className}
                    ${error ? "border-red-500 focus:bg-red-50" : "border-gray-300"}
                `}
                id={id}
                ref={ref}
                {...props}
                onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {error && (
                <p className="text-red-500 text-xs mt-1">
                    {error.message || error}
                </p>
            )}
        </div>
    )
})

export default Input;


