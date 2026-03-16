"use client";
import { SelectedUsersType, useSendEmails } from "@/hooks/useAssignRider";
import { SelectProps } from "@/types/email.types";
import React, { Dispatch, SetStateAction, useState } from "react";
import { createContext, FC, ReactNode, useContext } from "react";

type SendMailTypes = {
  selectedUsers: SelectedUsersType[];
  setSelectedUsers: Dispatch<SetStateAction<SelectedUsersType[]>>;
  handleSelectUsers: (data: SelectedUsersType) => void;
  removeSelectedUsers: (value: string) => void;
  bulkValue: SelectProps | null;
  setBulkValue: Dispatch<SetStateAction<SelectProps | null>>;
};

// Define the type for the context
type SendMailContextType = SendMailTypes;

// Create the context
const SendMailContext = createContext<SendMailContextType | undefined>(
  undefined,
);

// Define the provider component
export const SendMailProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [bulkValue, setBulkValue] = useState<SelectProps | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<SelectedUsersType[]>([]);

  const handleSelectUsers = (data: SelectedUsersType) => {
    setSelectedUsers((prev) => [...prev, data]);
  };
  const removeSelectedUsers = (value: string) => {
    setSelectedUsers((prev) => prev?.filter((item) => item?.email !== value));
  };

  const val = {
    children,
    selectedUsers,
    setSelectedUsers,
    handleSelectUsers,
    removeSelectedUsers,
    bulkValue,
    setBulkValue,
  };

  return (
    <SendMailContext.Provider value={val}>{children}</SendMailContext.Provider>
  );
};

// Custom hook to consume the context
export const useSendMailContext = (): SendMailContextType => {
  const context = useContext(SendMailContext);
  if (!context) {
    throw new Error(
      "useSendMailContext must be used within a SendMailProvider",
    );
  }
  return context;
};
