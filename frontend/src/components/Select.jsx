import React, { useId } from 'react'

function Select(
    {
        label,
        className = "",
        option,
        error,
        defaultValue = "",
        ...props
    },ref) {
    const id = useId();
    return(
        
        <div className="w-full">
            {label && 
                <label className={`inline-block ${error ? "text-red-500" : "text-gray-400"}`} htmlFor={id}>{label}</label>}
            <select 
                className={` border outline-none focus:bg-red-50 focus:border-red-500 duration-200 text-black rounded-sm block w-full p-2.5 ${className} ${error ? "border-red-500 focus:bg-red-50" : "border-gray-300"}`}
                {...props}
                ref={ref}
                id={id}
                defaultValue={defaultValue}
                
            >
                <option value="" disabled hidden>Select an option</option>
                {option?.map((option)=>(
                    <option key={option}>{option}</option>
                ))}
            </select>
            {error && (
                <p className="text-red-500 text-xs mt-1">
                    {error.message || error}
                </p>
            )}
        </div>
    )
}

export default React.forwardRef(Select);