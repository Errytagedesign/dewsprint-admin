import Field from "@/components/ui/field";
import FileImage from "@/components/ui/fileImage";
import { RidersType } from "@/types/riders";
import { getStatusColors } from "@/utils/helpers";
import React from "react";

export default function RiderProfile({ rider }: { rider: RidersType }) {
  return (
    <section className="roundedCard flex-1 p-4">
      <article className="flex justify-between">
        <FileImage
          url={rider?.profilePhotoUrl}
          userName={rider?.name}
          email={rider?.email}
        />

        <div>
          <p className={`${getStatusColors(rider?.status)}`}>{rider?.status}</p>
        </div>
      </article>

      <ul className="mt-6 space-y-5">
        <li>
          <Field
            title="Online status"
            subtitle={`${rider?.isOnline ? "Online" : "Offline"}`}
          />
        </li>
        <li>
          <Field
            title="Wallet Balance"
            subtitle={`￡${rider?.walletBalance}`}
          />
        </li>
        <li>
          <Field title="Email" subtitle={rider?.email} />
        </li>
        <li>
          <Field title="Phone number" subtitle={rider?.phone} />
        </li>
        <li>
          <Field title="City" subtitle={rider?.city?.name} />
        </li>
        <li>
          <Field title="Vehicle Type" subtitle={rider?.vehicleType} />
        </li>
        <li>
          <Field title="Vehicle Number" subtitle={rider?.vehicleNumber} />
        </li>
      </ul>
    </section>
  );
}
