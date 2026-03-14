import BlockUsers from "@/components/main/customer/blockUsers";
import CustomerProfile from "@/components/main/customer/customerProfile";
import WalletBalance from "@/components/main/customer/walletBalance";
import Transactions from "@/components/main/transactions/transactions";
import GoBackBtn from "@/components/ui/goBackBtn";
import TableLoading from "@/components/ui/skeleton/tableLoading";
import { getCustomerByIdApi } from "@/services/apis/customers.api";
import { Customer } from "@/types/customers.types";
import { OrdersSearchParams } from "@/types/orders.types";
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

  // const rsp = await getCustomerByIdApi(String(param?.customerId));
  // const customerData = rsp?.ok ? rsp?.body?.customer : ({} as Customer);

  // const { user, wallet } = customerData;

  return (
    <main className="flex flex-col gap-3">
      <header className="roundedCard flex flex-wrap items-center justify-between gap-3">
        <GoBackBtn />

        {/* <BlockUsers user={user} /> */}
      </header>

      <section className="flex flex-wrap gap-4">
        {/* <CustomerProfile user={user} /> */}
        {/* <WalletBalance wallet={wallet} customerId={String(param?.customerId)} /> */}
      </section>
      {/* <section className="roundedCard">
        <Suspense fallback={<TableLoading />}>
          <Transactions params={param} />
        </Suspense>
      </section> */}
    </main>
  );
}
