"use client";
import Button from "@/components/ui/button";
import EmailSaerch from "@/components/ui/emailSaerch";
import { EmptyState } from "@/components/ui/emptyUI";
import FileImage from "@/components/ui/fileImage";
import TableLoading from "@/components/ui/skeleton/tableLoading";
import { useAssignRider } from "@/hooks/useAssignRider";
import { UserDataTypes } from "@/types/auth";
import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

type RiderListProps = {
  selectedRider: Partial<UserDataTypes>;
  handleSelectUsers: (data: Partial<UserDataTypes>) => void;
};

export const AssignRiderList = ({
  selectedRider,
  handleSelectUsers,
}: RiderListProps) => {
  const {
    toggle,
    setToggle,
    error,
    isPending,
    isLoading,
    ridersData,
    hasNextPage,
    loadMore,
    isFetchingNextPage,
  } = useAssignRider();

  return (
    <article className="relative">
      <div
        className={`peer text-grey-600 placeholder:text-grey-400 disabled:bg-grey-100 border-grey-200 flex size-full w-full items-center justify-between rounded-[4px] border bg-transparent px-[18px] py-3.5 font-sans text-sm transition-all duration-300 outline-none focus-within:py-[18px] focus-within:pb-2.5 focus:py-[18px] focus:pb-2.5 disabled:cursor-not-allowed`}
        onClick={() => setToggle(!toggle)}
      >
        <div className="flex-1">
          <p>{selectedRider?.name ?? "Select a Rider"}</p>
        </div>

        {toggle ? (
          <FaChevronUp className="text-grey-600" />
        ) : (
          <FaChevronDown className="text-grey-600" />
        )}
      </div>

      {toggle && (
        <div className="card custom-scrollbar absolute top-[110%] z-50 h-[40vh] w-full overflow-auto rounded-lg bg-white p-3 shadow-md">
          {isLoading || isPending ? (
            <TableLoading num={5} />
          ) : error ? (
            <EmptyState
              title={error?.name || "Error"}
              subTitle={error?.message}
              className=""
            />
          ) : (
            <ul className="divide-Line !space-y-3 divide-y">
              <EmailSaerch
                placeholder="Search by name, email address or username"
                className="!mb-5 flex-1"
              />
              {ridersData?.map(({ id, name, email, profilePhotoUrl }) => (
                <li
                  key={id}
                  className={`${selectedRider?.id === id ? "bg-grey-100 rounded-2xl" : ""} cursor-pointer p-3`}
                  onClick={() => {
                    handleSelectUsers({ id, name });
                    setToggle(!toggle);
                  }}
                >
                  <FileImage
                    url={profilePhotoUrl}
                    userName={name}
                    email={email}
                  />
                </li>
              ))}

              <div className="flex w-full items-center justify-center">
                {hasNextPage && (
                  <Button
                    className="outline-btn"
                    onClick={loadMore}
                    loading={isFetchingNextPage}
                  >
                    Loading More
                  </Button>
                )}
              </div>
            </ul>
          )}
        </div>
      )}
    </article>
  );
};
