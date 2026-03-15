"use client";
import Button from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import InputField from "@/components/ui/form/input-field";
import ModalWrapper from "@/components/ui/modals/modalWrappers";
import { SelectInput } from "@/components/ui/select/SelectInput";
import { useModalContext } from "@/context/modalContext";
import { addTeamMatesAction } from "@/libs/actions/settings.action";
import { ActionFormStatus } from "@/types/global.types";
import { handleError, handleSuccess } from "@/utils/helpers";
import React, { useActionState, useEffect } from "react";

export const AddTeamMates = ({ role }: { role: string }) => {
  const { openModal, isOpen, closeModal } = useModalContext();

  const initialStatus: ActionFormStatus = {
    error: false,
    message: "",
  };

  const [state, formAction, isPending] = useActionState(
    addTeamMatesAction,
    initialStatus,
  );

  useEffect(() => {
    if (state?.error) {
      handleError(state?.message);
    } else if (!state?.error && state?.message !== "") {
      handleSuccess(state?.message);
      closeModal("add");
    }
  }, [state]);

  return (
    <>
      <article className="flex gap-2">
        {/* <Button className="outline-btn !text-primary text-center">
          <DownloadIcon /> Download CSV
        </Button> */}
        {role?.toLowerCase() !== "member" && (
          <Button className="pry-btn" onClick={() => openModal("add")}>
            Add New User
          </Button>
        )}
      </article>

      {isOpen["add"] && (
        <ModalWrapper
          id="add"
          title="Add Member"
          titleClass="!text-lg !font-medium text-center"
        >
          <form action={formAction} className="mt-5 space-y-5">
            <InputField label="First Name" name="firstName" />
            <InputField label="Last Name" name="lastName" />
            <InputField label="Email Address" name="email" />
            <SelectInput
              name="role"
              placeholder="Select"
              options={[
                { title: "Admin", value: "admin" },
                { title: "Member", value: "member" },
              ]}
              keyPropertyName="title"
              valuePropertyName="value"
              itemPropertyName="title"
              onChange={() => {}}
              selected=""
              className="w-full"
            />

            <DialogFooter className="">
              <Button
                className="pry-btn w-full"
                type="submit"
                loading={isPending}
              >
                Send Invite
              </Button>
            </DialogFooter>
          </form>
        </ModalWrapper>
      )}
    </>
  );
};
