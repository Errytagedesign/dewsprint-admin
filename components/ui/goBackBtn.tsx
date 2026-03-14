"use client";

import { ChevLeft } from "@/public/svgs/svgs";
import { useRouter } from "next/navigation";

const GoBackBtn = ({
  className,
  noIcon,
}: {
  className?: string;
  noIcon?: boolean;
}) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={`${className} flex items-center gap-2 text-sm text-black`}
    >
      {noIcon ? (
        "Go Back"
      ) : (
        <>
          {" "}
          <ChevLeft /> Go Back
        </>
      )}
    </button>
  );
};
export default GoBackBtn;
