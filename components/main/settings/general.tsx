import React from "react";
import { GeneralForm } from "./generalForm";
import { UserDataTypes } from "@/types/auth";

const General = ({ userData }: { userData: UserDataTypes }) => {
  return (
    <section>
      <header>
        <h4 className="mb-2 !text-base font-medium">General</h4>
        <small>
          This section allows you to customize various aspects of your account
          to enhance your experience.
        </small>
      </header>

      <GeneralForm userData={userData} />
    </section>
  );
};

export default General;
