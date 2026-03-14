import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { FaChevronDown } from "react-icons/fa6";

const PopoverWrapper = ({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-0.5">
          {icon ? icon : <FaChevronDown />}
        </button>
      </PopoverTrigger>

      <PopoverContent className="mr-5 bg-white">{children}</PopoverContent>
    </Popover>
  );
};

export default PopoverWrapper;
