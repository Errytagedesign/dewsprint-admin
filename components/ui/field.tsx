import { ReactNode } from "react";

const Field = ({
  title,
  subtitle,
  className,
}: {
  title: string | ReactNode;
  subtitle: string | ReactNode;
  className?: string;
}) => {
  return (
    <div className={className}>
      <h5 className="text-grey-800 w-3/12 text-sm">{title}</h5>
      <div className="flex flex-1 justify-end">
        {typeof subtitle === "string" ? (
          <h5 className="text-grey-800 text-right text-sm font-medium whitespace-break-spaces capitalize">
            {subtitle}
          </h5>
        ) : (
          subtitle
        )}
      </div>
    </div>
  );
};

export default Field;
