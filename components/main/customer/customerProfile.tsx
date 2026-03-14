import Field from "@/components/ui/field";
import FileImage from "@/components/ui/fileImage";
import { User } from "@/types/customers.types";
import { formatDate, getStatusColors } from "@/utils/helpers";
import React from "react";

export default function CustomerProfile({ user }: { user: User }) {
  return (
    <section className="roundedCard flex-1 p-4">
      <article className="flex justify-between">
        <FileImage
          url={user?.imageUrl}
          userName={user?.fullName}
          email={user?.email}
        />

        <div>
          <p className={`${getStatusColors(user?.status)}`}>{user?.status}</p>
        </div>
      </article>

      <ul className="mt-6">
        <li>
          <Field title="Full Name" subtitle={user?.fullName} />
        </li>
        <li>
          <Field title="Email" subtitle={user?.email} />
        </li>
        <li>
          <Field
            title="Last Login"
            subtitle={`${formatDate(user?.last_login)} . ${formatDate(user?.last_login, true)}`}
          />
        </li>
        <li>
          <Field title="Date Registered" subtitle={user?.createdAt} />
        </li>
      </ul>
    </section>
  );
}
