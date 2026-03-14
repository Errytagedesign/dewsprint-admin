"use client";

import { InputHTMLAttributes, useState } from "react";
import Image from "next/image";
import styles from "./input-field.module.css";
import eyeIcon from "@/public/svgs/eye.svg";
import ErrorMessage from "../errorMessage";

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  label?: string;
  errorMessage?: string;
};

export default function InputField({
  label,
  type = "text",
  name,
  className,
  errorMessage,
  ...rest
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      {type === "textarea" ? (
        <div className="relative">
          <textarea
            name={name}
            id={name}
            placeholder=""
            className={`${styles.input} peer text-grey-600 placeholder:text-grey-400 disabled:bg-grey-100 size-full w-full rounded-[4px] border bg-transparent px-[18px] py-3.5 font-sans text-sm transition-all duration-300 outline-none focus-within:py-[18px] focus-within:pb-2.5 focus:py-[18px] focus:pb-2.5 disabled:cursor-not-allowed ${className || ""} ${errorMessage ? "border-error" : "border-grey-200"}`}
            rows={8}
            {...rest}
          />

          <label
            htmlFor={name}
            className="text-grey-600 peer-focus-within:text-grey-500 peer-focus:text-grey-500 absolute top-1/6 left-[18px] -translate-y-1/2 cursor-text transition-all duration-300 peer-focus-within:top-0 peer-focus-within:text-[0.625rem] peer-focus:top-0 peer-focus:translate-y-0 peer-focus:text-[0.625rem]"
          >
            {label}
          </label>
        </div>
      ) : (
        <div className="relative h-[49px]">
          <input
            name={name}
            id={name}
            type={type === "password" ? (showPassword ? "text" : type) : type}
            placeholder=""
            className={`${styles.input} peer text-grey-600 placeholder:text-grey-400 disabled:bg-grey-100 size-full w-full rounded-[4px] border bg-transparent px-[18px] py-3.5 font-sans text-sm transition-all duration-300 outline-none focus-within:py-[18px] focus-within:pb-2.5 focus:py-[18px] focus:pb-2.5 disabled:cursor-not-allowed ${className || ""} ${errorMessage ? "border-error" : "border-grey-200"}`}
            {...rest}
          />

          <label
            htmlFor={name}
            className="text-grey-600 peer-focus-within:text-grey-500 peer-focus:text-grey-500 absolute top-1/2 left-[18px] -translate-y-1/2 cursor-text transition-all duration-300 peer-focus-within:top-0 peer-focus-within:text-[0.625rem] peer-focus:top-0 peer-focus:translate-y-0 peer-focus:text-[0.625rem]"
          >
            {label}
          </label>

          {type === "password" && (
            <button
              type="button"
              className={`after:bg-Gray-400 absolute top-1/2 right-[18px] -translate-y-1/2 after:absolute after:top-1/2 after:left-1/2 after:h-full after:w-0.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:content-[''] ${showPassword ? "after:inline" : "after:hidden"}`}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <Image src={eyeIcon} alt="eye icon" />
            </button>
          )}
        </div>
      )}

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
}
