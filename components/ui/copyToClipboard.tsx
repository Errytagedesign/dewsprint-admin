"use client";
import { cn } from "@/libs/utils";
import React, { useEffect, useState } from "react";
import { FaCircleCheck, FaRegCopy } from "react-icons/fa6";

export const handleCopyToClipboard = (id: string | number, val: string) => {
  if (id) {
    navigator.clipboard.writeText(val);
  }
};

const CopyToClipboardBtn = ({
  id,
  valueToCopy,
  className,
  title,
}: {
  id: string | number;
  valueToCopy: string;
  className?: string;
  title?: string;
}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const handleCopy = () => {
    setClicked(!clicked);
    handleCopyToClipboard(id, valueToCopy);
  };

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(!clicked);
      }, 1000);
    }
  }, [clicked]);

  return (
    <button onClick={handleCopy} className={className}>
      {clicked ? (
        <span className="animate__animated animate__bounceIn text-success">
          <FaCircleCheck />
        </span>
      ) : (
        <span
          className={cn("text-grey-500 flex items-center gap-2", className)}
        >
          <FaRegCopy size={12} />
          {title}
        </span>
      )}
    </button>
  );
};

export default CopyToClipboardBtn;
