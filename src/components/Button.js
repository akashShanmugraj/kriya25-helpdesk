import React from "react";

const Button = ({
  handleClick,
  text,
  className = "",
  outlined = false,
  disabled = false,
}) => {

  if (disabled) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          if (!disabled) handleClick(e);
        }}
        className={`${className} bg-gray-500 border-gray-500 border-2 font-semibold text-lg w-full px-4 py-2 rounded-lg shadow-lg`}
      >
        {text}
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) handleClick(e);
      }}
      className={`${className} ${outlined ? "text-violet-600 bg-white " : "bg-violet-600 text-white"
        } border-violet-600 border-2 font-semibold text-lg w-full px-4 py-2 rounded-lg shadow-lg`}
    >
      {text}
    </button>
  );
};

export default Button;
