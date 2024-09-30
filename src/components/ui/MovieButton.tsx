import React from 'react';
import { Tooltip } from "@material-tailwind/react";

interface MovieButtonProps {
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const MovieButton: React.FC<MovieButtonProps> = ({ icon, label, onClick }) => {
  return (
    <Tooltip content={label} placement="top" className="text-sm">
      <button
        onClick={onClick}
        className="p-2 mr-1 border-2 border-white-800 rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      >
        {icon}
      </button>
    </Tooltip>
  );
};

export default MovieButton;



