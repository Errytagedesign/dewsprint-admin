import Button from "@/components/ui/button";
import EmptyState from "@/components/ui/emptyUI";
import { getOrdersByCountryApi } from "@/services/apis/dashhboard.api";
import React from "react";
import Image from "next/image";

export default async function RecentOrdersByCountry({
  title,
  type,
  path,
}: {
  title: string;
  type: string;
  path: string;
}) {
  const rsp = await getOrdersByCountryApi(type);

  if (!rsp?.ok) {
    return (
      <EmptyState
        title={rsp?.body?.message}
        subTitle={rsp?.body?.description}
        className="max-h-[500px]"
      />
    );
  }

  const { data } = rsp?.body;

  return (
    <article className="roundedCard max-h-[500px] overflow-hidden">
      <div className="flex items-center justify-between">
        <p className="!font-medium">{title}</p>
        <Button link href={path} className="outline-btn">
          View all
        </Button>
      </div>

      {data?.length === 0 ? (
        <EmptyState
          title={`No ${type === "esim" ? type : "Rentals"} Datas`}
          subTitle={`Recent ${type === "esim" ? type : "Rentals"}  will appear here when they are available`}
          className="max-h-[500px]"
        />
      ) : (
        <ul className="mt-5 h-5/6 space-y-2 overflow-y-auto">
          {data.map(({ country, initial, total }, index) => (
            <li key={index}>
              <article className="card flex items-center justify-between p-3">
                <div className="flex flex-1 items-center gap-2">
                  <figure className="relative size-8 overflow-hidden rounded-full">
                    <Image
                      src={`https://flagcdn.com/w160/${country?.includes("United States") ? "us" : initial?.toLowerCase()}.png`}
                      alt={country}
                      fill
                      sizes="100%"
                    />{" "}
                  </figure>
                  <p className="text-grey-800 !text-sm">{country}</p>
                </div>

                <div className="flex w-4/12 items-center gap-1">
                  <p className="text-grey-800 !text-sm !font-medium">{total}</p>
                  <p className="text-grey-800 !text-xs">Numbers</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
