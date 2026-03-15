import Field from "@/components/ui/field";
import FileImage from "@/components/ui/fileImage";
import { CustomerType } from "@/types/customers";
import { getStatusColors } from "@/utils/helpers";
import React from "react";

export default function CustomerProfile({ user }: { user: CustomerType }) {
  return (
    <section className="roundedCard flex-1 p-4">
      <article className="flex justify-between">
        <FileImage
          url={user?.profilePhotoUrl}
          userName={user?.name}
          email={user?.email}
        />

        <div>
          <p className={`${getStatusColors(user?.status)}`}>{user?.status}</p>
        </div>
      </article>

      <ul className="mt-6">
        <li>
          <Field title="Wallet Balance" subtitle={`￡${user?.walletBalance}`} />
        </li>
        <li>
          <Field title="Email" subtitle={user?.email} />
        </li>
        <li>
          <Field title="City" subtitle={user?.city?.name} />
          <Field title="Phone number" subtitle={user?.phone} />
        </li>
      </ul>
    </section>
  );
}
