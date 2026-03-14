import EmptyState from "@/components/ui/emptyUI";
import {
  getOrderSummaryApi,
  getSubscriptionSummaryApi,
} from "@/services/apis/dashhboard.api";
import React, { Fragment } from "react";
import { SummaryCard } from "./summaryCard";

export default async function MoreOrderSummary() {
  const rsp = await getOrderSummaryApi();
  const subRsp = await getSubscriptionSummaryApi();

  if (!rsp?.ok) {
    return (
      <EmptyState
        title={rsp?.body?.message}
        subTitle={rsp?.body?.description}
        className="min-h-[40vh]"
      />
    );
  }

  if (!subRsp?.ok) {
    return (
      <EmptyState
        title={rsp?.body?.message || subRsp?.body?.message}
        subTitle={subRsp?.body?.description}
        className="min-h-[40vh]"
      />
    );
  }

  const { types, total } = rsp?.body?.data;
  const { total: subTotal, amount } = subRsp?.body?.data;

  if (total === 0) {
    return (
      <EmptyState
        title={`No Datas`}
        subTitle={`Services summary will appear here when they are available`}
        className="min-h-[40vh]"
      />
    );
  }

  const filteredServices = [
    { type: "subscriptions", total: subTotal, amount },
    ...[...types]?.filter((s) => ["gift_card", "airtime"]?.includes(s.type)),
  ];

  return (
    <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {filteredServices?.map((item, index) => (
        <Fragment key={index}>
          <SummaryCard {...item} sub />
        </Fragment>
      ))}
    </ul>
  );
}
