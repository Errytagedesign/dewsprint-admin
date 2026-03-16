"use client";
import Button from "@/components/ui/button";
import EmailSaerch from "@/components/ui/emailSaerch";
import { EmptyState } from "@/components/ui/emptyUI";
import FileImage from "@/components/ui/fileImage";
import TableLoading from "@/components/ui/skeleton/tableLoading";
import { SelectedUsersType, useAssignRider } from "@/hooks/useAssignRider";
import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
 

type RiderListProps = {
  selected?: string;
  selectedUsers: SelectedUsersType[];
  handleSelectUsers: (data: SelectedUsersType) => void;
  removeSelectedUsers: (email: string) => void;
};

export const RiderList = ({
  selected,
  selectedUsers,
  handleSelectUsers,
  removeSelectedUsers,
}: RiderListProps) => {
  const {
    toggle,
    setToggle,
    error,
    isPending,
    isLoading,
    usersData,
    hasNextPage,
    loadMore,
    isFetchingNextPage,
    data,
  } = useAssignRider();
 
  return (
    <article className="relative">
      <div
        className={`peer text-grey-600 placeholder:text-grey-400 disabled:bg-grey-100 size-full w-full rounded-[4px] border bg-transparent px-[18px] py-3.5 font-sans text-sm transition-all duration-300 outline-none focus-within:py-[18px] focus-within:pb-2.5 focus:py-[18px] focus:pb-2.5 disabled:cursor-not-allowed border-grey-200 flex items-center justify-between`}
        onClick={() => setToggle(!toggle)}
      >
        <div className="flex-1">
          {selectedUsers?.length === 0 ? (
            <p>{selected ?? "Recipient"}</p>
          ) : (
            <ul className="flex flex-wrap items-center gap-2">
              {selectedUsers?.map(({ email }, idx) => (
                <li
                  key={idx}
                  className="bg-grey-100 !text-grey-800 flex cursor-pointer items-center gap-2 rounded-lg p-2 !text-xs"
                  onClick={() => removeSelectedUsers(email)}
                >
                  {email}
                </li>
              ))}
            </ul>
          )}
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
              {usersData?.map(({ id, fullName, email, imageUrl }) => (
                <li
                  key={id}
                  className="cursor-pointer pb-3"
                  onClick={() => handleSelectUsers({ id, email })}
                >
                  <FileImage url={imageUrl} userName={fullName} email={email} />
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

 