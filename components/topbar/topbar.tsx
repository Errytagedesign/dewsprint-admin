import { NotifIcon } from "@/public/svgs/svgs";
import Image from "next/image";
import { allImages } from "@/public/images/images";
import PopoverWrapper from "../ui/popover/popoverWrapper";
import UserCard from "./userCard";
import Hambugger from "./hambugger";
import "./navbar.css";
import { getUser } from "@/services/session";
import { UserDataTypes } from "@/types/auth";

const TopBar = async () => {
  const userData = await getUser();

  return (
    <>
      <header className="hidden min-h-(--main-header-height) items-center justify-center rounded-2xl bg-white lg:flex">
        <section className="heading flex w-full items-center justify-between gap-4 p-5">
          <article className="w-fit">
            <small className="text-grey-500 !text-xs">Welcome back</small>
            <h5 className="!text-lg font-medium">{userData?.name}</h5>
          </article>
          <div className="card bg-grey-50 flex items-center justify-end gap-2 !rounded-full px-3 py-2">
            <figure className="relative size-10 overflow-hidden rounded-full">
              <Image
                src={allImages.noAvatar}
                alt="profile"
                className="h-full w-full object-cover"
                fill
                sizes="100%"
              />
            </figure>
            <div>
              <h5 className="font-medium">{userData?.name}</h5>
              <small className="text-grey-500">{userData?.email}</small>
            </div>
            <PopoverWrapper>
              <UserCard userData={userData as UserDataTypes} />
            </PopoverWrapper>
          </div>
        </section>
      </header>

      <header className="flex min-h-(--main-header-height) items-center justify-between rounded-2xl bg-white lg:hidden">
        <article className="w-fit">
          <small className="text-grey-500 !text-xs">Welcome back</small>
          <h5 className="!text-lg font-medium">{userData?.name}</h5>
        </article>

        <div className="flex flex-1 items-center justify-end px-2">
          <Hambugger />
        </div>
      </header>
    </>
  );
};

export default TopBar;
