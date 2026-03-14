"use client";
import Image, { StaticImageData } from "next/image";
import UserInitials from "./userInitials";

type FileImageProps = {
  url: string | StaticImageData;
  userName: string;
  noName?: boolean;
  email?: string;
};

export default function FileImage({
  url,
  userName,
  noName,
  email,
}: FileImageProps) {
  return (
    <article className="flex items-center gap-2.5">
      {url ? (
        <figure className="relative size-10 overflow-hidden rounded-full">
          <Image src={url} alt="image" fill className="object-cover" />
        </figure>
      ) : (
        <UserInitials bg="bg-primary" userName={userName} />
      )}

      {!noName && (
        <div>
          <p className="text-grey-800 !text-sm !font-medium capitalize">
            {userName}
          </p>
          <small className="text-grey-500 !text-xs">{email}</small>
        </div>
      )}
    </article>
  );
}
