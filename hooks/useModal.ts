"use client";
import { AllAssets } from "@/types/orders.types";
import { useState } from "react";
export const useModal = () => {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const [itemId, setItemId] = useState<string>("");
  const [getData, setGetData] = useState<AllAssets>({} as AllAssets);

  const openModal = (id: string) => {
    setIsOpen((prev) => ({ ...prev, [id]: true }));
    setItemId(id);
  };

  const closeModal = (id: string) => {
    setIsOpen((prev) => ({ ...prev, [id]: false }));
  };

  // const toggleModal = (id: string) => {
  //   setToggleModal((prev) => ({ ...prev, [id]: !prev[id] }));
  // };

  return {
    setItemId,
    itemId,
    isOpen,
    openModal,
    closeModal,
    getData,
    setGetData,
  };
};
