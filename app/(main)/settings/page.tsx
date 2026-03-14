import React from "react";
import { PagesTabParams } from "@/types/global.types";
import PageTabs from "@/components/ui/tabs/PageTabs";
import General from "@/components/main/settings/general";
import Password from "@/components/main/settings/password";
import Teams from "@/components/main/settings/teams/teams";
import { Metadata } from "next";
import { getCurrentUserApi } from "@/services/apis/auth.api";
import { UserDataTypes } from "@/types/auth.types";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function page({ searchParams }: PagesTabParams) {
  const param = await searchParams;
  const currentTab = param.tab || "general";
  const user = await getCurrentUserApi();

  const userData = user?.ok ? user?.body?.user : ({} as UserDataTypes);
  let pageContents = null;

  const tabs = [
    {
      id: "general",
      title: "General",
    },
    {
      id: "password",
      title: "Password",
    },

    {
      id: "teams",
      title: "Teams",
    },
  ];

  switch (currentTab) {
    case "password":
      pageContents = <Password />;
      break;
    case "teams":
      pageContents = <Teams searchParams={searchParams} />;
      break;
    default:
      pageContents = <General userData={userData} />;
  }
  return (
    <main className="roundedCard divide-Line flex min-h-screen justify-between gap-6 divide-x">
      <PageTabs
        tabDatas={tabs}
        searchParams={param}
        defaultTab={currentTab}
        path="/settings"
        activeClass="bg-primary-50 text-primary"
        notActiveClass="bg-grey-25 "
        containerClassName="px-6 py-4 flex-1"
        tabClassName="flex-col pr-5 "
        className="flex-col"
        pageContent={pageContents}
      />
    </main>
  );
}
