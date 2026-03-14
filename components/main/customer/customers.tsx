import { OrdersSearchParams } from "@/types/orders";
import { getCustomersApi } from "@/services/apis/customers.api";
import { ErrorUI } from "@/components/ui/emptyUI";
import PageLayout from "@/components/pageLayout";
import CustomerTable from "./customerTable";

export default async function Customers({
  params,
}: {
  params: OrdersSearchParams;
}) {
  const { page, search, status } = params;

  const rsp = await getCustomersApi({
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
    <PageLayout pageTitle="Customers" data={data}>
      <CustomerTable />
    </PageLayout>
  );
}
