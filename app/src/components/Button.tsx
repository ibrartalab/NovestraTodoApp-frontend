import React from "react";


interface ButtonProps {
    title: string;
    disabled: boolean;
    children?: React.ReactNode;
    styleClass?: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
}


const Button:React.FC<ButtonProps> = ({ title, disabled,children,styleClass, onClick,type}) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled}
        className={`bg-button_color-black  text-sm font-medium min-w-4 min-h-4 p-4 ${styleClass}`}
        >
            {title}
            {children}
        </button>
    );
}

export default Button;