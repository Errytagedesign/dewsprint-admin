import React, { ReactNode } from "react";
import Button from "../button";
import { DialogClose, DialogFooter } from "./dialog";
import { cn } from "@/libs/utils";
import { ModalWrappers } from "./modalWrappers";

interface IRejecrOrder {
  id: string;
  action?: () => void;
  btnMainClass?: string;
  btnSecClass?: string;
  title: string;
  subTitle?: string;
  headerClass?: string;
  actionTitle: string | ReactNode;
  icon?: ReactNode;
  closeTitle?: string;
  iconClassName?: string;
  containerClassName?: string;
  loading?: boolean;
  subtitleClass?: string;
  titleClass?: string;
}

const ActionModals: React.FC<IRejecrOrder> = ({
  id,
  action,
  btnMainClass,
  btnSecClass,
  title,
  subTitle,
  actionTitle,
  icon,
  closeTitle,
  iconClassName,
  headerClass,
  loading,
  titleClass,
}) => {
  return (
    <ModalWrappers
      id={id}
      icon={<div className={`${iconClassName}`}>{icon}</div>}
      title={title}
      subtitle={String(subTitle)}
      headerClass={cn(headerClass, "border-0! justify-center items-center")}
      subtitleClass={"font-normal text-center"}
      titleClass={titleClass}
      wrapperClass="!rounded-[20px]"
    >
      <section>
        <DialogFooter className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <DialogClose asChild>
            <Button type="button" className={btnSecClass}>
              {closeTitle}
            </Button>
          </DialogClose>

          <Button
            className={cn("pry-btn", btnMainClass)}
            type="button"
            onClick={action}
            loading={loading}
          >
            {actionTitle}
          </Button>
        </DialogFooter>
      </section>
    </ModalWrappers>
  );
};

export default ActionModals;
