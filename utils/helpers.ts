import { toast } from "@/hooks/use-toast";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function debouncer<T>(func: (val: T) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (val: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(val);
    }, delay);
  };
}

export const formatNumInThousands = (number: number | string) => {
  const numericValue = Number(number);
  if (Number.isNaN(numericValue)) {
    return "0.0";
  }
  // convert to string and split into different part
  const [intPart, originalDecimalPart] = number?.toString()?.split(".");

  // rever to start formartting from right hand
  const reversedNum = intPart.split("").reverse().join("");

  // loop through the value and add , after every 3 chars
  const formattedVal = reversedNum
    .match(/.{1,3}/g)
    ?.join(",")
    .split("")
    .reverse()
    .join("");

  let decimalPart = originalDecimalPart || "00";
  if (decimalPart.length === 1) {
    decimalPart += "0";
  }

  return formattedVal + "." + Number(decimalPart);
};

export const getStatusColors = (status: string) => {
  const statusLower = status?.toLowerCase();

  if (
    [
      "active",
      "approved",
      "completed",
      "successful",
      "success",
      "verified",
      "confirmed",
      "requested",
      "activated",
    ].includes(statusLower)
  ) {
    return "success";
  }

  if (
    ["declined", "failed", "rejected", "cancelled", "refunded"]?.includes(
      statusLower,
    )
  ) {
    return "failed";
  }

  if (["pending", "processing"]?.includes(statusLower)) {
    return "warning";
  }

  return "fall-back";
};

export const getUserInitials = (name: string | null | undefined) => {
  if (!name) return "";
  const splitedValues = name?.split(" ");

  const fName = splitedValues[0] || "";
  const lName = splitedValues[1] || "";

  return (fName.slice(0, 1) + lName.slice(0, 1)).toUpperCase();
};

export const formatDate = (date: string, time?: boolean) => {
  return date && time
    ? new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";
};

export const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "numeric",
  });
};

export const getNetwork = (val: string) => {
  return val.split(" ").at(2)?.split("-").at(0);
};

export const converAmountToUSDT = (amount: number) => {
  return amount / 1e6;
};

export const handleCopyToClipboard = (id: string | number, val: string) => {
  if (id) {
    navigator.clipboard.writeText(val);
  }
};

export const formatPhoneNumber = (num: string | number) => {
  // Use regex to replace non-digit characters with an empty string
  const cleanedUpNum = num?.toString().replace(/\D/g, "");

  const countryCode = cleanedUpNum?.slice(0, 1);
  const areaCode = cleanedUpNum?.slice(0, 3);
  const firstPart = cleanedUpNum?.slice(3, 6);
  const secondPart = cleanedUpNum?.slice(6, 11);
  // Step 4: Concatenate with formatting
  const formattedNumber =
    "+" +
    countryCode +
    " " +
    `(${areaCode})` +
    " " +
    firstPart +
    "-" +
    secondPart;

  // Step 5: Return or display the formatted phone number
  return formattedNumber;
};

export const formatPhoneNumberV2 = (num: string | number) => {
  // Use regex to replace non-digit characters with an empty string
  const cleanedUpNum = num?.toString().replace(/\D/g, "");

  const countryCode = cleanedUpNum?.slice(0, 1);
  const areaCode = cleanedUpNum?.slice(0, 3);
  const firstPart = cleanedUpNum?.slice(3, 6);
  const secondPart = cleanedUpNum?.slice(6, 11);
  // Step 4: Concatenate with formatting
  const formattedNumber = `(${areaCode})` + " " + firstPart + "-" + secondPart;

  // Step 5: Return or display the formatted phone number
  return formattedNumber;
};

export const handleSuccess = (
  message: string,
  push?: (href: string, options?: NavigateOptions) => void,
  path?: string,
) => {
  if (path && push) {
    toast({
      variant: "default",
      title: "Success",
      description: message,
    });
    push(path);
  } else {
    toast({
      variant: "default",
      title: "Success",
      description: message,
    });
  }
};

export const handleError = (message: string) => {
  toast({
    variant: "destructive",
    title: "error",
    description: message,
  });
};

export const addElipsisToText = (text: string, maximumLenght?: number) => {
  const maxLength = maximumLenght ?? 8;
  if (text?.length <= maxLength) {
    return text;
  }

  const startLength = Math.ceil(maxLength / 2);
  const endLength = maxLength - startLength;

  const startText = text?.substring(0, startLength);
  const endText = text?.substring(text?.length - endLength);

  return `${startText}...${endText}`;
};

export const formatBalance = (amount: string) => {
  const amountNumber = Number(amount);
  return amountNumber / 100;
};

export const formatNumbers = (val: number) => {
  return val?.toLocaleString("en-US");
};

export interface PasswordValidationResult {
  isValid: boolean;
  passwordError?: string;
  confirmPasswordError?: string;
}

export const isPasswordStrong = (pass: string): boolean => {
  const hasSpecialChars = /^(?=.*[!@#$%^&*])/.test(pass);
  const hasUppercase = /^(?=.*[A-Z])/.test(pass);
  const hasNumber = /^(?=.*[0-9])/.test(pass);
  const hasMinLength = pass.length >= 8;

  return hasSpecialChars && hasUppercase && hasNumber && hasMinLength;
};

export const validatePasswords = (
  password: string,
  confirmPassword?: string,
): PasswordValidationResult => {
  const result: PasswordValidationResult = {
    isValid: true,
  };

  // Validate password strength
  if (!isPasswordStrong(password)) {
    result.passwordError = "Password does not meet strength requirements";
    result.isValid = false;
  }

  // Validate password match
  if (confirmPassword && password !== confirmPassword) {
    result.confirmPasswordError = "Passwords do not match";
    result.isValid = false;
  }

  return result;
};

export const queryBuilder = (query: { [key: string]: string }) => {
  const filteredParams = Object.entries(query).filter(
    ([_, v]) => v !== undefined && v !== "undefined" && v !== null && v !== "",
  );

  const params = new URLSearchParams(filteredParams);
  return params;
};
