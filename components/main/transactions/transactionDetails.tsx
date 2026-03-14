"use client";
import ModalWrapper from "@/components/ui/modals/ModalWrapper";
import React from "react";
import DetailHeader from "../orders/detailsModal/detailHeader";
import CopyToClipboardBtn from "@/components/ui/copyToClipboard";
import { formatNumInThousands, getStatusColors } from "@/utils/helpers";
import Field from "@/components/ui/field";
import { ITransaction } from "@/types/transactions.types";
import OrderId from "../orders/table/orderId";
import OrderDate from "../orders/table/orderDate";

const TransactionDetails = ({ data }: { data: ITransaction }) => {
  return (
    <ModalWrapper
      id={data?.id}
      title="Transaction detail"
      titleClass="!text-lg !text-grey-800 !font-medium text-center"
      wrapperClass=" !max-w-xl max-h-[90vh] overflow-y-auto"
    >
      <article className="mt-10 flex flex-col gap-3">
        <article className="flex justify-between gap-3">
          <p className="text-grey-800 !text-sm">
            Order ID:{" "}
            <span>
              <OrderId id={data?.id} />{" "}
              <CopyToClipboardBtn
                id={String(data?.id)}
                valuToCopy={String(data?.id)}
              />
            </span>
          </p>
          <OrderDate
            date={data?.created_date}
            className="!flex-row items-center"
          />
        </article>
        <DetailHeader
          name={`${data?.customer?.user?.fullName} `}
          email={data?.customer?.user?.email}
          customerId={data?.customer?.id}
          userId={data?.customer?.user?.id}
        />
      </article>

      <article className="border-grey-200 flex flex-col items-center justify-center gap-2 rounded-xl border p-4">
        <p className="!text-grey-800 text-xl font-medium">Amount</p>
        <div className="flex items-center gap-2">
          <h5 className="!text-grey-800 text-2xl font-medium">
            ${formatNumInThousands(Number(data?.amount) / 100)}
          </h5>
        </div>
        <p className={`${getStatusColors(String(data?.status))}`}>
          {data?.status}
        </p>
      </article>
      <article className="border-grey-200 flex flex-col items-center justify-center gap-4 rounded-xl border p-4">
        <Field
          title="Type"
          subtitle={data?.type}
          className="flex w-full items-center justify-between"
        />
        <Field
          title="Reference"
          subtitle={
            <span className="gap flex items-center gap-2">
              {data?.reference}{" "}
              <CopyToClipboardBtn
                id={data?.reference}
                valuToCopy={data?.reference}
              />
            </span>
          }
          className="flex w-full items-center justify-between"
        />
        {/* <Field
          title="Payment method"
          subtitle="Bank Transfer"
          className="flex w-full items-center justify-between"
        /> */}
        <Field
          title="Payment description"
          subtitle={data?.description}
          className="flex w-full items-center justify-between"
        />
        <Field
          title="Payment provider"
          subtitle={data?.payment?.provider || "N/A"}
          className="flex w-full items-center justify-between"
        />
        <Field
          title="Payment reference"
          subtitle={
            <span className="gap flex items-center gap-2">
              {data?.payment?.providerReference || "N/A"}
              <CopyToClipboardBtn
                id={data?.payment?.providerReference}
                valuToCopy={data?.payment?.providerReference}
              />
            </span>
          }
          className="flex w-full items-center justify-between"
        />
        <Field
          title="Balance"
          subtitle={`$${formatNumInThousands(Number(data?.balance) / 100)}`}
          className="flex w-full items-center justify-between"
        />
      </article>
    </ModalWrapper>
  );
};

export default TransactionDetails;
