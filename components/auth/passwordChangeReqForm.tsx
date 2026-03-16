"use client";
import React, { useActionState, useEffect } from "react";
import { useState } from "react";
import InputField from "../ui/form/input-field";
import Button from "../ui/button";

import { useRouter } from "next/navigation";
import { forgotPasswordRequestAction } from "@/libs/actions/auth.actions";
import { useAuthContext } from "@/context/authContext";
import { ActionFormStatus } from "@/types/global";
import { UserDataAndAccessToken } from "@/types/auth";
import { handleError, handleSuccess } from "@/utils/helpers";

const PasswordChangeReqForm = () => {
  const { push } = useRouter();

  const { setUserData } = useAuthContext();

  const initialStatus: ActionFormStatus & { data: UserDataAndAccessToken } = {
    error: false,
    message: "",
    data: {} as UserDataAndAccessToken,
  };

  const [state, formAction, isPending] = useActionState(
    forgotPasswordRequestAction,
    initialStatus,
  );

  const [formData, setFormData] = useState("");

  useEffect(() => {
    if (state?.error) {
      handleError(state?.message);
    } else if (state?.message) {
      setUserData((prev) => ({
        ...prev,
        email: formData,
      }));
      handleSuccess(state?.message, push, "/reset-password");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <article className="mt-5 w-full">
        <InputField
          id="email"
          name="email"
          type="email"
          label="Email Address"
          defaultValue={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
      </article>
      <article className="mt-10">
        <Button className="pry-btn w-full" type="submit" loading={isPending}>
          Send Code
        </Button>
      </article>
    </form>
  );
};

export default PasswordChangeReqForm;
