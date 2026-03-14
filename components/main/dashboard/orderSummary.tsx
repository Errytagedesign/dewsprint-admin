import EmptyState from "@/components/ui/emptyUI";
import { getOrderSummaryApi } from "@/services/apis/dashhboard.api";
import React, { Fragment } from "react";
import { SummaryCard } from "./summaryCard";

export default async function OrderSummary() {
  const rsp = await getOrderSummaryApi();

  if (!rsp?.ok) {
    return (
      <EmptyState
        title={rsp?.body?.message}
        subTitle={rsp?.body?.description}
        className="min-h-[40vh]"
      />
    );
  }

  const { types, total } = rsp?.body?.data;
  if (total === 0) {
    return (
      <EmptyState
        title={`No Datas`}
        subTitle={`Services summary will appear here when they are available`}
        className="min-h-[40vh]"
      />
    );
  }

  const filteredServices = [...types]?.filter(
    (s) => !["gift_card", "airtime"]?.includes(s.type),
  );

  return (
    <ul className="mt-3 flex flex-col gap-4">
      {filteredServices?.map((item, index) => (
        <Fragment key={index}>
          <SummaryCard {...item} />
        </Fragment>
      ))}
    </ul>
  );
}
