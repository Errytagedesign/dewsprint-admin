"use client";

import FileImage from "@/components/ui/fileImage";
import { Column } from "@/components/ui/tableComponent/tableComponent";
import {
  formatNumInThousands,
  formatDate,
  getStatusColors,
  formatBalance,
} from "./helpers";

import { TeamsAction } from "@/components/main/settings/teams/teamsAction";
import {
  TableDate,
  TableID,
  TableStatus,
} from "@/components/ui/tableComponent/tabelComps";
import { UserDataTypes } from "@/types/auth";
import { ITransaction } from "@/types/transactions";
import { CustomerType } from "@/types/customers";

export const transactionColData: Column<ITransaction>[] = [
  {
    title: "Name",
    key: "customer",
    render: (_, record) => (
      <FileImage
        url={record?.customer?.user?.imageUrl as string}
        userName={`${record?.customer?.user?.fullName}`}
        email={record?.customer?.user?.email}
      />
    ),
  },
  {
    title: "Ref.",
    key: "reference",
    render: (_, record) => <>{record?.reference}</>,
  },
  {
    title: "Type",
    key: "type",
    render: (_, record) => (
      <span className="capitalize">{record?.type?.split("_")?.join(" ")}</span>
    ),
  },

  {
    title: "Amount",
    key: "amount",
    render: (_, record) => (
      <>${formatNumInThousands(Number(record?.amount) / 100)}</>
    ),
  },

  {
    title: "Date",
    key: "created_date",
    render: (_, record) => <TableDate date={record?.created_date} />,
  },

  {
    title: "Status",
    key: "status",
    render: (_, { status }) => (
      <div className="flex">
        <span className={`${getStatusColors(status)} `}>{status}</span>
      </div>
    ),
  },
];

export const customerColData: Column<CustomerType>[] = [
  {
    title: "ID",
    key: "id",
    render: (_, record) => <TableID id={record?.id} />,
  },
  {
    title: "Name",
    key: "name",
    render: (_, record) => (
      <FileImage
        url={record?.profilePhotoUrl as string}
        userName={record?.name}
        email={record?.email}
      />
    ),
  },

  {
    title: "Email",
    key: "email",
    render: (_, record) => <>{record?.email}</>,
  },

  {
    title: "Phone Number",
    key: "phone",
    render: (_, record) => <>{record?.phone}</>,
  },

  {
    title: "Status",
    key: "status",
    render: (_, { status }) => <TableStatus status={status} />,
  },
];

export const teamsColData: Column<UserDataTypes & { action?: string }>[] = [
  {
    title: "Name",
    key: "name",
    render: (_, record) => (
      <FileImage
        url={record?.profilePhotoUrl as string}
        userName={record?.name}
        email={record?.email}
      />
    ),
  },

  {
    title: "Role",
    key: "role",
    render: (_, record) => <span className="capitalize">{record?.role}</span>,
  },

  {
    title: "Actions",
    key: "action",
    render: (_, record) => <TeamsAction user={record} />,
  },
];
