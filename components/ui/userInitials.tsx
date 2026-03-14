import { getUserInitials } from "@/utils/helpers";
import React from "react";

const UserInitials = ({
  bg,
  showName,
  userName,
  className,
}: {
  showName?: boolean;
  bg?: string;
  userName: string;
  className?: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`${className} grid h-10 w-10 place-items-center rounded-full ${
          bg ? bg : "bg-white"
        }`}
      >
        <h4 className="font-semibold text-white">
          {getUserInitials(userName) || "N/A"}
        </h4>
      </div>
      {showName && (
        <h4 className="text-CharcoalGrey font-semibold"> {userName}</h4>
      )}
    </div>
  );
};

export default UserInitials;
