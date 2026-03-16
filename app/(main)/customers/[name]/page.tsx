import CustomerProfile from "@/components/main/customer/customerProfile";
import { ErrorUI } from "@/components/ui/emptyUI";
import GoBackBtn from "@/components/ui/goBackBtn";
import { getCustomerByIdApi } from "@/services/apis/customers.api";
import { OrdersSearchParams } from "@/types/orders";
import { Metadata } from "next";
import React from "react";

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

  const rsp = await getCustomerByIdApi(param?.id as string);

  if (!rsp?.ok) {
    const { message, code } = rsp?.body;

    return <ErrorUI code={code} message={message} className="min-h-[70vh]" />;
  }

  const customerData = rsp?.body?.data?.user;

  return (
    <main className="flex flex-col gap-3">
      <header className="roundedCard flex flex-wrap items-center justify-between gap-3">
        <GoBackBtn />
      </header>

      <section className="flex flex-wrap gap-4">
        <CustomerProfile user={customerData} />
      </section>
    </main>
  );
}
