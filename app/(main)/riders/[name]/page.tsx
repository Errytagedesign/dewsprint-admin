import RiderOrders from "@/components/main/riders/riderOrders";
import RiderProfile from "@/components/main/riders/riderProfile";
import { DocumentsTable } from "@/components/main/riders/riderTable";
import { ErrorUI } from "@/components/ui/emptyUI";
import GoBackBtn from "@/components/ui/goBackBtn";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import {
  getRiderDocumentsApi,
  getRidersByIdApi,
} from "@/services/apis/riders.api";
import { OrdersSearchParams } from "@/types/orders";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> => {
  const { name } = await params;

  return {
    title: name,
  };
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<OrdersSearchParams>;
}) {
  const param = await searchParams;

  const [riderRsp, docsRsp] = await Promise.all([
    getRidersByIdApi(param?.id as string),
    getRiderDocumentsApi(param?.id as string),
  ]);

  if (!riderRsp?.ok || !docsRsp?.ok) {
    const { message, code } = riderRsp?.body || docsRsp?.body;

    return <ErrorUI code={code} message={message} className="min-h-[70vh]" />;
  }

  const riderData = riderRsp?.body?.data?.rider;
  const riderDocs = docsRsp?.body?.data?.documents;

  return (
    <main className="flex flex-col gap-3">
      <header className="roundedCard flex flex-wrap items-center justify-between gap-3">
        <GoBackBtn />
      </header>

      <RiderProfile rider={riderData} />

      <section className="roundedCard flex-1 p-4">
        <h4>Documents</h4>
        <DocumentsTable data={riderDocs} />
      </section>
      <section className="roundedCard flex-1 p-4">
        <h4>Orders</h4>
        <Suspense fallback={<TableSkeleton columns={6} />}>
          <RiderOrders params={param} />
        </Suspense>
      </section>
    </main>
  );
}
