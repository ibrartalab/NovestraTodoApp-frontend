import React from "react";

type ButtonUse = "button" | "submit" | "reset";
interface ButtonProps {
    title: string;
    disabled: boolean;
    children?: React.ReactNode;
    styleClass?: string;
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
    type?: ButtonUse;
}


const Button:React.FC<ButtonProps> = ({ title, disabled,children,styleClass, onClick,type}) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled}
        className={`bg-button_color-black  text-xs font-normal min-w-4 min-h-4 ${styleClass}`}
        >
            {title}
            {children}
        </button>
    );
}

export default Button;