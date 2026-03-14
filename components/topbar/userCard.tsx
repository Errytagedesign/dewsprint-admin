import React from "react";
import Logout from "../logout/logout";
import Image from "next/image";
import { allImages } from "@/public/images/images";
import { UserDataTypes } from "@/types/auth";
import Button from "../ui/button";

const UserCard = ({ userData }: { userData: UserDataTypes }) => {
  return (
    <section className="space-y-5">
      <article className="card !rounded-2xl px-3 py-2">
        <div className="mb-4 flex items-center justify-between gap-2">
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
        </div>

        <Button className="outline-btn w-full !rounded-full">
          Edit Profile
        </Button>
      </article>

      <Logout />
    </section>
  );
};

export default UserCard;
