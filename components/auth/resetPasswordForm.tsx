"use client";

import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import InputField from "../ui/form/input-field";
import Button from "../ui/button";
import StrongPassword from "../ui/strongPassword";
import { ActionFormStatus } from "@/types/global";
import { passwordResetAction } from "@/libs/actions/auth.actions";
import { handleError, handleSuccess } from "@/utils/helpers";
import { useAuthContext } from "@/context/authContext";

const initialValues = {
  otp: "",
  newPassword: "",
  confirmPassword: "",
};

const ResetPasswordForm = () => {
  const [values, setValues] = useState(initialValues);

  const initialStatus: ActionFormStatus = {
    error: false,
    message: "",
  };

  const { push } = useRouter();

  const { userData } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [state, formAction, isPending] = useActionState(
    passwordResetAction,
    initialStatus,
  );

  useEffect(() => {
    if (state?.error) {
      handleError(state?.message);
    } else if (state?.message) {
      handleSuccess(state?.message, push, "/login");
    }
  }, [state]);

  const notMatchError =
    state?.error && state?.message === "Password does not match"
      ? state?.message
      : "";

  return (
    <form action={formAction}>
      <article className="mt-5 w-full space-y-3">
        <InputField
          id="email"
          name="email"
          type="hidden"
          value={userData?.email}
          onChange={handleChange}
        />
        <InputField
          id="otp"
          name="otp"
          type="text"
          label="Eenter OTP sent to your mail"
          value={values.otp}
          onChange={handleChange}
        />

        <InputField
          id="newPassword"
          name="newPassword"
          type="password"
          label="Password"
          value={values.newPassword}
          onChange={handleChange}
        />

        <InputField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
          errorMessage={notMatchError}
        />
      </article>
      <StrongPassword password={values?.newPassword} className="mt-5" />

      <article className="mt-10">
        <Button type="submit" className="pry-btn w-full" loading={isPending}>
          Reset Password
        </Button>
      </article>
    </form>
  );
};

export default ResetPasswordForm;
