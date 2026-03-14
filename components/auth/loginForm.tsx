"use client";

import React, { useActionState, useEffect } from "react";
import Link from "next/link";
import InputField from "../ui/form/input-field";
import Button from "../ui/button";
import { signInAction } from "@/libs/actions/auth.actions";
import { ActionFormStatus } from "@/types/global";
import { useRouter, useSearchParams } from "next/navigation";
import { handleSuccess } from "@/utils/helpers";
import { handleError } from "@/utils/helpers";

const SignInForm = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const initialStatus: ActionFormStatus = {
    error: false,
    message: "",
  };

  const [state, formAction, isPending] = useActionState(
    signInAction,
    initialStatus,
    "/",
  );

  useEffect(() => {
    if (state?.error) {
      handleError(state?.message);
    } else if (!state?.error && state?.message !== "") {
      if (redirect) {
        handleSuccess(state?.message, push, redirect);
      } else {
        handleSuccess(state?.message, push, "/dashboard");
      }
    }
  }, [state, push, redirect]);

  return (
    <form action={formAction} className="space-y-4">
      <InputField
        id="email"
        name="email"
        type="email"
        label="Email Address"
        required
      />

      <InputField
        id="password"
        name="password"
        type="password"
        label="Password"
        required
      />

      <div className="flex justify-end">
        <Link
          href="/forgot-password-request"
          className="text-primary text-sm font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      <article className="mt-5">
        <Button className="pry-btn w-full" type="submit" loading={isPending}>
          Login
        </Button>
      </article>
    </form>
  );
};

export default SignInForm;
