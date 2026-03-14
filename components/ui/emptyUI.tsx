"use client";

import React, { ReactNode, SVGProps } from "react";
import { PiWarningOctagon } from "react-icons/pi";
import Button from "./button";

export const EmptyState = ({
  title,
  subTitle,
  className,
  iconClassName,
}: {
  title: string;
  className?: string;
  iconClassName?: string;
  subTitle: string;
  icon?: ReactNode;
}) => {
  return (
    <section
      className={` ${className} flex flex-col items-center justify-center gap-5`}
    >
      <div
        className={`${iconClassName} flex w-3/12 flex-col items-center justify-center`}
      >
        <NotFound />
      </div>

      <div className="text-grey-600 w-full text-center">
        <h4>{title}</h4>
        <p>{subTitle}</p>
      </div>
    </section>
  );
};

export const ErrorMessage = ({ message }: { message: any }) => {
  return (
    <div className="error_message font-semi-bold animate__animated animate__bounceIn flex items-center gap-2">
      <div>
        <PiWarningOctagon />
      </div>
      <p className="error_message"> {message}</p>
    </div>
  );
};

export const ErrorUI = ({
  code,
  message,
  className,
}: {
  code: number;
  message?: string;
  className?: string;
}) => {
  return (
    <div
      className={` ${className} flex h-full w-full items-center justify-center bg-white py-9`}
    >
      <div className="mx-auto flex w-full max-w-[352px] flex-col items-center">
        {code === 500 ? (
          <div className="mb-4">
            <ReloadIcon />
          </div>
        ) : (
          <div className="flex w-8/12 flex-col items-center justify-center">
            <NotFound />
          </div>
        )}

        <div className="mb-6 space-y-2 text-center">
          <h3 className="text-lg font-semibold">Error - {code}</h3>
          <p className="text-grey-600 text-sm">{message}</p>
        </div>

        {code === 500 && <ReloadButton />}
      </div>
    </div>
  );
};

export const ReloadButton = () => {
  const hanldeReload = () => window.location.reload();

  return (
    <Button onClick={hanldeReload} className="pry-btn">
      Reload
    </Button>
  );
};

export const ReloadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={60}
    height={60}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.54758 29.2573C9.07216 27.0487 9.9041 24.7578 11.2291 22.4628C17.2166 12.0921 30.467 8.54168 40.8377 14.5292C51.2084 20.5167 54.7588 33.7671 48.7713 44.1378C42.7838 54.5084 29.5334 58.0589 19.1627 52.0714C15.3089 49.8464 12.3899 46.6023 10.5521 42.8854"
      stroke="#98A2B3"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M34.0057 40.17L28.6827 36.9934C27.7555 36.4439 27 35.1218 27 34.04V27"
      stroke="#98A2B3"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.97921 31.9615L5.01106 21"
      stroke="#98A2B3"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.979 31.9617L16.2527 30.1579"
      stroke="#98A2B3"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const NotFound = (props: SVGProps<SVGSVGElement>) => (
  <svg
    // width={180}
    // height={180}
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C67.6996 0 59.2227 26.7477 43.5 40.1802C24.1782 56.6875 0 62.5948 0 90C0 139.706 40.2944 180 90 180Z"
      fill="#EEF0F6"
    />
    <g filter="url(#filter0_f_18922_1460)">
      <path
        d="M138 60H60C57.5147 60 55.5 61.7227 55.5 63.8478V144.652C55.5 146.777 57.5147 148.5 60 148.5H138C140.485 148.5 142.5 146.777 142.5 144.652V63.8478C142.5 61.7227 140.485 60 138 60Z"
        fill="white"
      />
      <path
        d="M138 60H60C57.5147 60 55.5 61.7227 55.5 63.8478V144.652C55.5 146.777 57.5147 148.5 60 148.5H138C140.485 148.5 142.5 146.777 142.5 144.652V63.8478C142.5 61.7227 140.485 60 138 60Z"
        fill="#E1E5EF"
      />
    </g>
    <path
      d="M52.5 60C52.5 53.3726 57.8726 48 64.5 48H121.5C128.127 48 133.5 53.3726 133.5 60V124.5C133.5 131.127 128.127 136.5 121.5 136.5H64.5C57.8726 136.5 52.5 131.127 52.5 124.5V60Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M126.991 131.803C128.539 130.427 128.679 128.057 127.303 126.509L115.303 113.009C113.927 111.461 111.557 111.321 110.009 112.697C108.461 114.073 108.321 116.443 109.697 117.991L121.697 131.491C123.073 133.039 125.443 133.179 126.991 131.803Z"
      fill="#676C93"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M99 81.75C90.3015 81.75 83.25 88.8015 83.25 97.5C83.25 106.198 90.3015 113.25 99 113.25C107.698 113.25 114.75 106.198 114.75 97.5C114.75 88.8015 107.698 81.75 99 81.75ZM75.75 97.5C75.75 84.6594 86.1594 74.25 99 74.25C111.841 74.25 122.25 84.6594 122.25 97.5C122.25 110.341 111.841 120.75 99 120.75C86.1594 120.75 75.75 110.341 75.75 97.5Z"
      fill="#676C93"
    />
    <defs>
      <filter
        id="filter0_f_18922_1460"
        x={39}
        y={43.5}
        width={120}
        height={121.5}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={8.25}
          result="effect1_foregroundBlur_18922_1460"
        />
      </filter>
    </defs>
  </svg>
);
