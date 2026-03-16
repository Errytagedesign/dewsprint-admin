import React from "react";
import { AddTeamMates } from "./addTeamMates";
import { getTeamMatesApi } from "@/services/apis/settings.api";
import OrdersLayout from "../../../pageLayout";
import { TeamsTable } from "./teamsTable";
import TablePagination from "@/components/ui/tableComponent/tablePaginations";
import { getUser } from "@/services/session";
import { PagesTabParams } from "@/types/global";
import { EmptyState, ErrorUI } from "@/components/ui/emptyUI";

const Teams = async ({ searchParams }: PagesTabParams) => {
  const { page } = await searchParams;
  // const rsp = await getTeamMatesApi({ page: Number(page) || 1 });

  // const user = await getUser();

  // if (!rsp?.ok) {
  //   const { message, code } = rsp?.body;

  //   return (
  //     <OrdersLayout pageTitle="Teams">
  //       <ErrorUI
  //         message={message}
  //         code={code}
  //         className="min-h-[70vh]"
  //       />
  //     </OrdersLayout>
  //   );
  // }

  // const { totalCount, totalPages, pageSize, teamMembers } = rsp?.body;

  // if (totalCount === 0) {
  //   return (
  //     <OrdersLayout pageTitle="Teams">
  //       <EmptyState
  //         title={`No Teams Datas`}
  //         subTitle={`No data found for Teams, your Teams datas will appear here when they are available`}
  //         className="min-h-[70vh]"
  //       />
  //     </OrdersLayout>
  //   );
  // }

  // const data = {
  //   pageSize,
  //   totalCount,
  //   totalPages,
  //   assets: teamMembers,
  // };

  return (
    <main>
      <header className="flex justify-between gap-2">
        <article>
          <h4 className="!text-base font-medium">Team Members</h4>
          <small className="text-grey-500">
            Manage your team members and their account permissions here.
          </small>
        </article>

        {/* <AddTeamMates role={user?.role as string} /> */}
      </header>

      {/* <OrdersLayout pageTitle="Teams" data={data} recent>
        <TeamsTable />
       </OrdersLayout> */}
    </main>
  );
};

export default Teams;
