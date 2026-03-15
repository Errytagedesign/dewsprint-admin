import { OrdersSearchParams } from "@/types/orders";
import { ErrorUI } from "@/components/ui/emptyUI";
import PageLayout from "@/components/pageLayout";
import { RiderTable } from "./riderTable";
import { getRidersApi } from "@/services/apis/riders.api";

export default async function Riders({
  params,
}: {
  params: OrdersSearchParams;
}) {
  const { page, search, status } = params;

  const rsp = await getRidersApi({
    page: page || "1",
    search,
    status: status === "all" ? "" : status?.toUpperCase(),
  });

  if (!rsp?.ok) {
    const { message, code } = rsp?.body;

    return (
      <PageLayout pageTitle="Customers">
        <ErrorUI code={code} message={message} className="min-h-[70vh]" />
      </PageLayout>
    );
  }

  const { pagination, items } = rsp?.body?.data;

  const data = {
    ...pagination,
    assets: items,
  };

  return (
    <PageLayout pageTitle="Riders" data={data}>
      <RiderTable />
    </PageLayout>
  );
}
