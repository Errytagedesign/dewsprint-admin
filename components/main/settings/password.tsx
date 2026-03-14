"use client";

import Button from "@/components/ui/button";
import InputField from "@/components/ui/form/input-field";
import StrongPassword from "@/components/ui/strongPassword";
import { currentUserUpdatePasswordAction } from "@/libs/actions/auth.actions";
import { handleError, handleSuccess, validatePasswords } from "@/utils/helpers";
import React, { FormEvent, useState, useTransition } from "react";

const Password = () => {
  const [error, setError] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    password: "",
    oldPassword: "",
    confirmPassword: "",
  });
  const [toggle, setToggle] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = validatePasswords(
      formData?.password,
      formData?.confirmPassword,
    );

    if (formData?.oldPassword === "") {
      setError((prev) => ({
        ...prev,
        oldPassword: "Please enter your current password",
      }));
      return;
    }

    if (!validationResult?.isValid) {
      setError((prev) => ({
        ...prev,

        password: validationResult?.passwordError || "",
        confirmPassword: validationResult?.confirmPasswordError || "",
      }));
      return;
    }
    setError({});

    if (validationResult.isValid) {
      startTransition(async () => {
        const payload = {
          password: formData?.password,
          oldPassword: formData?.oldPassword,
        };
        const rsp = await currentUserUpdatePasswordAction(payload);
        if (rsp?.error) {
          handleError(rsp?.message);
        } else {
          handleSuccess(rsp?.message);
          setToggle(!toggle);
        }
      });
    }
  };

  const handleChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target as HTMLInputElement;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section>
      <header>
        <h4 className="mb-2 !text-base font-medium">Change Password</h4>
        <small>
          You can change your password anytime you think it is unsafe.
        </small>
      </header>

      <form onSubmit={handleSubmit} className="mt-10 space-y-16">
        <section className="flex justify-between gap-24">
          <article className="w-full lg:w-52">
            <h5 className="text-sm font-medium">Your current password</h5>
            <small>
              This will confirm that you are the one who wants to change your
              password{" "}
            </small>
          </article>

          <article className="flex-1">
            <InputField
              name="oldPassword"
              type="password"
              value={formData?.oldPassword}
              onChange={handleChange}
              disabled={!toggle}
              errorMessage={error["oldPassword"]}
            />
          </article>
        </section>
        <section className="flex justify-between gap-24">
          <article className="w-full lg:w-52">
            <h5 className="text-sm font-medium">New password</h5>
            <small>Enter your new password with minimal character 8.</small>
          </article>

          <article className="flex-1">
            <InputField
              name="password"
              type="password"
              value={formData?.password}
              onChange={handleChange}
              disabled={!toggle}
              errorMessage={error["password"]}
            />

            {formData?.password && (
              <StrongPassword password={formData?.password} />
            )}
          </article>
        </section>
        <section className="flex justify-between gap-24">
          <article className="w-full lg:w-52">
            <h5 className="text-sm font-medium">Confirm new password</h5>
            <small>Enter the same password with before.</small>
          </article>

          <article className="flex-1">
            <InputField
              name="confirmPassword"
              type="password"
              value={formData?.confirmPassword}
              onChange={handleChange}
              disabled={!toggle}
              errorMessage={error["confirmPassword"]}
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
    </section>
  );
};

export default Password;
