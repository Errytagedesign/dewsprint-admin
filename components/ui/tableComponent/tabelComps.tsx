"use client";

import Image, { StaticImageData } from "next/image";
import CopyToClipboardBtn from "../copyToClipboard";
import { formatDate, formatTime, getStatusColors } from "@/utils/helpers";
import TableComponent, { Column } from "./tableComponent";
import { AllAssets } from "@/types/global";

export const TableID = ({ id }: { id: string }) => {
  return (
    <div className="flex items-center gap-1">
      {id?.slice(0, 10)}...
      <CopyToClipboardBtn id={id} valueToCopy={id} />
    </div>
  );
};

export const TableStatus = ({ status }: { status: string }) => {
  return (
    <p
      className={`${getStatusColors(status)} flex w-fit items-center justify-center gap-1 capitalize`}
    >
      {status?.toLowerCase()}
    </p>
  );
};

export const AvatarCard = ({
  image,
  label,
  subtext,
}: {
  label: string;
  subtext?: string;
  image: string | StaticImageData;
}) => {
  return (
    <div className="flex flex-1 items-center gap-3">
      <figure className="relative size-12 overflow-hidden rounded-xl">
        <Image src={image} alt="" sizes="100%" fill />
      </figure>
      <div className="flex-1">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-grey-300 text-xs font-medium">{subtext}</p>
      </div>
    </div>
  );
};

export default function TableWrapper({
  title,
  columns,
  data,
}: {
  title: string;
  columns: Column<AllAssets>[];
  data: AllAssets[];
}) {
  return <TableComponent title={title} columns={columns} data={data} />;
}

export const TableDate = ({
  date,
  className,
}: {
  className?: string;
  date: string;
}) => {
  return (
    <div className={`${className} flex flex-col gap-1`}>{formatDate(date)}</div>
  );
};

export const TableTime = ({
  date,
  className,
}: {
  className?: string;
  date: string;
}) => {
  return (
    <div className={`${className} flex flex-col gap-1`}>{formatTime(date)}</div>
  );
};
