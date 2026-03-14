import { Wallet } from "@/types/customers.types";
import { formatBalance, formatNumInThousands } from "@/utils/helpers";
import React from "react";
import { WalletDropdown, WalletTopup } from "./walletTopup";

export default function WalletBalance({
  wallet,
  customerId,
}: {
  customerId: string;
  wallet: Wallet;
}) {
  return (
    <section className="roundedCard flex w-full flex-col justify-between lg:w-3/12">
      <p className="text-grey-500">Wallet</p>
      <article className="flex h-full flex-col items-center justify-center">
        <p className="text-grey-500 !text-sm">Available balance</p>
        <h3 className="!font-medium">
          $
          {formatNumInThousands(
            formatBalance(String(wallet?.balance ?? 0)) ?? "0",
          )}
        </h3>

        <WalletTopup customerId={customerId} />
        <WalletDropdown customerId={customerId} />
      </article>
    </section>
  );
}
