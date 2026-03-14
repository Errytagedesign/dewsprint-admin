import EmptyState from "@/components/ui/emptyUI";
import { cn } from "@/libs/utils";
import {
  getJAPBalanceAPi,
  getReloadlyBalanceAPi,
  getSMSPoolBalanceAPi,
} from "@/services/apis/dashhboard.api";
import React from "react";

export default async function ProviderBalances({
  className,
}: {
  className?: string;
}) {
  const [poolRsp, reloadRsp, japRsp] = await Promise.all([
    getSMSPoolBalanceAPi(),
    getReloadlyBalanceAPi(),
    getJAPBalanceAPi(),
  ]);

  if (!poolRsp?.ok && !reloadRsp?.ok && !japRsp?.ok) {
    return (
      <section className="roundedCard">
        <h4 className="mb-4 !text-base !font-medium">Providers Balances</h4>
        <EmptyState
          title="Error"
          subTitle={
            poolRsp?.body?.message ||
            reloadRsp?.body?.message ||
            japRsp?.body?.message
          }
          className="min-h-[40vh]"
        />
      </section>
    );
  }

  const poolBalance = poolRsp?.ok ? poolRsp?.body?.data : null;
  const reloadlyBalance = reloadRsp?.ok ? reloadRsp?.body : null;
  const japBalance = japRsp?.ok ? japRsp?.body : null;

  return (
    <section>
      <h4 className="mb-4 !text-base !font-medium">Providers Balances</h4>
      <ul
        className={cn(
          "mt-2 mb-3 grid flex-1 grid-cols-1 gap-3 lg:grid-cols-3",
          className,
        )}
      >
        {poolBalance ? (
          <li className="roundedCard">
            <p className="text-grey-600 !mb-4">SMSpool balance</p>
            <h3 className="!font-medium">${poolBalance?.balance || "0"}</h3>
          </li>
        ) : (
          <li className="roundedCard">
            {" "}
            <EmptyState title="Error" subTitle="" />{" "}
          </li>
        )}
        {reloadlyBalance ? (
          <li className="roundedCard">
            <p className="text-grey-600 !mb-4">Reloadly balance</p>
            <h3 className="!font-medium">${reloadlyBalance?.balance || "0"}</h3>
          </li>
        ) : (
          <li className="roundedCard">
            {" "}
            <EmptyState title="Error" subTitle="" />{" "}
          </li>
        )}
        {japBalance ? (
          <li className="roundedCard">
            <p className="text-grey-600 !mb-4">JAP balance</p>
            <h3 className="!font-medium">${japBalance?.balance || "0"}</h3>
          </li>
        ) : (
          <li className="roundedCard">
            {" "}
            <EmptyState title="" subTitle="Error" />{" "}
          </li>
        )}
      </ul>
    </section>
  );
}
