export default function Button({
    children,
    type = "button",
    className = "",
    ...props
}) {
    return (
        <button className="
            bg-red-500 
            hover:bg-red-600 
            text-white 
            font-bold 
            py-2 
            px-4 
            rounded 
            focus:outline-none 
            focus:shadow-outline
            cusor-pointer
            "
            type={type}
            {...props}
        >
           {children}
        </button>
    );
}