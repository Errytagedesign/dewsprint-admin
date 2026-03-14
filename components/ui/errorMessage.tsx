import { PiWarningOctagon } from "react-icons/pi";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="text-error mt-2 flex items-center gap-2 text-sm">
      <div>
        <PiWarningOctagon />
      </div>
      <span> {message}</span>
    </div>
  );
};

export default ErrorMessage;
