"use client";
import { servicesData } from "@/utils/constants";
import { formatBalance, formatNumbers } from "@/utils/helpers";

export const SummaryCard = ({
  sub,
  amount,
  total,
  type,
}: {
  amount: number;
  total: number;
  type: string;
  sub?: boolean;
}) => {
  const matchedData = servicesData[type];

  return (
    <li className="roundedCard !bg-grey-25 flex items-center justify-between">
      <article className="flex w-full flex-col justify-between gap-2">
        <div className="text-grey-500 flex items-center justify-between gap-2">
          <small className="text-grey-500">{matchedData?.name}</small>
          {matchedData?.icon}
        </div>

        <div className="mt-2 flex justify-between gap-8">
          <div>
            <h4 className="!font-medium">
              $
              {formatBalance(String(amount))?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </h4>
            <p className="text-sm text-gray-500">Total amount</p>
          </div>

          {!sub && (
            <div className="flex flex-col justify-end gap-1">
              <h4 className="text-right !font-medium">
                {formatNumbers(total)}
              </h4>
              <p className="text-sm text-gray-500">Total numbers</p>
            </div>
          )}
        </div>
      </article>
    </li>
  );
};
