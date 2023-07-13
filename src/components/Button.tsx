import React from "react";

interface IProps {
  text: string;
  handleClick?: () => void;
  disabled?: boolean;
}

const Button = ({ text, handleClick, disabled }: IProps) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`w-full rounded-full ${disabled ? "bg-blue-400" : "bg-primary"}
     px-2 py-1 font-semibold text-white md:px-4 md:py-2`}
    >
      {text}
    </button>
  );
};

export default Button;
