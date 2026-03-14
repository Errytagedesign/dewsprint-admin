"use client";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/form/input-field";
import { updateCurrentUserAction } from "@/libs/actions/settings.action";
import { cn } from "@/libs/utils";
import { allImages } from "@/public/images/images";
import { UploadIcon } from "@/public/svgs/svgs";
import { UserData } from "@/types/auth.types";
import { ActionFormStatus } from "@/types/global.types";
import { handleError, handleSuccess } from "@/utils/helpers";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";

export const GeneralForm = ({ userData }: { userData: UserData }) => {
  const [formData, setFormData] = useState<{
    fullName: string;
    file: File | null;
  }>({
    fullName: userData?.fullName ?? "",
    file: null,
  });
  const [toggle, setToggle] = useState(false);

  const initialStatus: ActionFormStatus = {
    error: false,
    message: "",
  };

  const [state, formAction, isPending] = useActionState(
    updateCurrentUserAction,
    initialStatus,
  );

  useEffect(() => {
    if (state?.error) {
      handleError(state?.message);
    } else if (!state?.error && state?.message !== "") {
      handleSuccess(state?.message);
      setToggle((prev) => !prev);
    }
  }, [state]);

  return (
    <>
      <form action={formAction} className="mt-10 space-y-16">
        <section className="flex justify-between gap-24">
          <article className="w-full lg:w-52">
            <h5 className="text-sm font-medium">Profile Picture</h5>
            <small>
              This will let you upload or change your profile picture.
            </small>
          </article>
          <article className="flex flex-1 items-center gap-3">
            <figure className="relative !size-20 overflow-hidden rounded-full">
              <Image
                src={userData?.imageUrl ?? allImages.noAvatar}
                alt=""
                className="object-cover"
                fill
                sizes="100%"
              />
            </figure>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="file"
                className={cn(
                  "outline-btn btn !border-primary",
                  !toggle ? "bg-grey-100 cursor-not-allowed" : "cursor-pointer",
                )}
              >
                {formData?.file?.name ?? (
                  <>
                    <UploadIcon /> Upload photo
                  </>
                )}
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="hidden"
                  accept=".jpg, .jpeg, .png, .gif, .webp"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      file: e.target.files ? e.target.files[0] : null,
                    }))
                  }
                  disabled={!toggle}
                />
              </label>
              <small>At least 256x256 PNG or JPG file</small>
            </div>
          </article>
        </section>

        <section className="flex justify-between gap-24">
          <article className="w-full lg:w-52">
            <h5 className="text-sm font-medium">Name</h5>
            <small>
              This will let you update or change your displayed name.
            </small>
          </article>

          <article className="flex-1">
            <InputField
              name="fullName"
              value={formData?.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              disabled={!toggle}
            />
          </article>
        </section>

        <section className="flex justify-between gap-24">
          <article className="w-full lg:w-52">
            <h5 className="text-sm font-medium">Email Address</h5>
            <small>This email can not be changed</small>
          </article>

          <article className="flex-1">
            <InputField
              name="email"
              value={userData?.email}
              onChange={() => {}}
              disabled
            />
          </article>
        </section>

        <section className="flex justify-end pt-4">
          {toggle && (
            <Button type="submit" className="pry-btn" loading={isPending}>
              Save changes
            </Button>
          )}
        </section>
      </form>

      <section className="flex justify-end pt-4">
        {!toggle && (
          <Button
            className="outline-btn"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            Edit
          </Button>
        )}
      </section>
    </>
  );
};
