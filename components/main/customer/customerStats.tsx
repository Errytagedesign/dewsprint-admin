import { cn } from "@/libs/utils";
import { getCustomerStatsApi } from "@/services/apis/customers.api";
import {
  formatBalance,
  formatNumbers,
  formatNumInThousands,
} from "@/utils/helpers";
import React from "react";

export default async function CustomerStats({
  className,
}: {
  className?: string;
}) {
  const rsp = await getCustomerStatsApi();


  const statsData = rsp?.ok ? rsp?.body?.data : null;

  return (
    <section
      className={cn(
        "mb-3 grid flex-1 grid-cols-1 gap-3 lg:grid-cols-2",
        className,
      )}
    >
      <article className="roundedCard !space-y-4">
        <p className="text-grey-600  ">Wallet</p>
        <div className="flex gap-2 justify-between">
          <div>
            <p className="text-grey-600 text-xs! !mb-1">Total Balance</p>
            <h3 className="!font-medium">

              $
              {formatNumInThousands(
                formatBalance(
                  String(statsData?.walletStats?.totalBalance) ?? 0,
                ).toFixed(2),
              )}
            </h3>
          </div>
          <div>
            <p className="text-grey-600 text-xs! !mb-1">Total Profits</p>
            <h3 className="!font-medium">

              $
              {formatNumInThousands(
                formatBalance(
                  String(statsData?.walletStats?.totalProfit) ?? 0,
                ).toFixed(2),
              )}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-success-500">
            +$
            {formatNumInThousands(
              formatBalance(
                String(statsData?.walletStats?.totalBalance) ?? 0,
              ).toFixed(2),
            )}
          </p>
          <p className="!bg-primary-25 !text-primary-500 rounded-lg !px-2 !py-1">
            +{statsData?.walletStats?.yearlyStats?.percentageChange}%
          </p>
        </div>
      </article>
      <article className="roundedCard">
        <p className="text-grey-600 !mb-4">Total customers</p>

        <h3 className="!font-medium">
          {formatNumbers(Number(statsData?.customerStats?.totalCustomers || 0))}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-success-500">
            +{statsData?.customerStats?.yearlyStats?.customerChange}
          </p>
          <p className="!bg-primary-25 !text-primary-500 rounded-lg !px-2 !py-1">
            +{statsData?.customerStats?.yearlyStats?.percentageChange}%
          </p>
        </div>
      </article>
    </section>
  );
}
