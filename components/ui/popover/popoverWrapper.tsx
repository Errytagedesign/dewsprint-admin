import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { FaChevronDown } from "react-icons/fa6";
import { cn } from "@/libs/utils";

const PopoverWrapper = ({
  icon,
  align = "center",
  className,
  children,
}: {
  align?: "center" | "start" | "end";
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-0.5">
          {icon ? icon : <FaChevronDown />}
        </button>
      </PopoverTrigger>

      <PopoverContent className={cn("bg-white", className)} align={align}>
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverWrapper;
