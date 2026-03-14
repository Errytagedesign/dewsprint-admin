import { ReactNode } from "react";
import { StaticImageData } from "next/image";

export type SearchParams = {
  searchParams: Promise<{
    tab: string;
  }>;
};

export interface TabProps {
  id: string;
  title?: string;
  icon?: ReactNode;
  pic?: StaticImageData;
  image?: string;
  name?: string;
  activeClass?: string;
  notActiveClass?: string;
  activeTab?: string;
  setActiveTab?: (id: string) => void;
  className?: string;
}

export interface TabContentsProps {
  id: string;
  activeTab?: string;
  comps?: ReactNode;
}

export interface TabDataProps {
  TabTitle?: TabProps[];
  TabContents: TabContentsProps[];
}

export interface IStepForm {
  onNext: () => void;
  onPrevious?: () => void;
}

export interface IStoreSetup {
  type?: string;
  label?: string;
  id: string;
  name: string;
  require?: boolean;
  disabled?: boolean;
  placeholder?: string;
  checked?: boolean;
  value?: string | number;
  options?: {
    id?: string;
    title?: string;
    value?: string;
  }[];
  // options?: {
  //   id?: string;
  //   title?: string;
  //   value?: string;
  //   name?: string;
  //   province?: string;
  // }[];
  canadianCities?: { [key: string]: string }[];
  canadianProvince?: { Province: string; City: string[] }[];
}

export interface IModal {
  id: string;
  close?: () => void;
}

export interface IAccordion {
  action: () => void;
  toggle: { [key: number]: boolean };
  id: number;
  question: string;
  title: string;
  subTitle: string;
  desc: ReactNode;
  subDesc: string;
}

export type ActionFormStatus = {
  error: boolean;
  message: string;
};

export type PagesTabParams = {
  searchParams: Promise<{ tab: string; page: string; search: string }>;
};
