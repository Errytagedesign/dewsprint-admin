import { FaRegCircleCheck } from "react-icons/fa6";

const StrongPassword = ({
  password,
  className,
}: {
  className?: string;
  password: string;
}) => {
  const isSpecialChars = password.match(/^(?=.*[!@#$%^&*])/);
  const isUppercase = password.match(/^(?=.*[A-Z])/);
  const isNumber = password.match(/^(?=.*[0-9])/);

  // const passwordStrength = () => {
  //   if (password.length >= 8 && isUppercase && isNumber && isSpecialChars) {
  //     return 'Strong Password';
  //   }
  //   if (password.length >= 8 && isUppercase && isNumber) {
  //     return 'Normal Password';
  //   }
  //   if (password.length >= 8 && isUppercase) {
  //     return 'Weak Password';
  //   }
  //   return 'Very Weak Password';
  // };

  return (
    <div className={`${className} w-full`}>
      <ul className="mb-3 grid grid-cols-2 gap-1 text-xs lg:grid-cols-4">
        <li
          className={`flex items-center gap-2 ${
            password.length >= 8 ? "text-positive" : "text-Grey-400"
          }`}
        >
          <FaRegCircleCheck /> Minimum 8 characters
        </li>
        <li
          className={`flex items-center gap-2 ${
            isSpecialChars ? "text-positive" : "text-Grey-400"
          }`}
        >
          <FaRegCircleCheck />
          Special character
        </li>
        <li
          className={`flex items-center gap-2 ${
            isUppercase ? "text-positive" : "text-Grey-400"
          }`}
        >
          <FaRegCircleCheck /> 1 UPPERCASE
        </li>
        <li
          className={`flex items-center gap-2 ${
            isNumber ? "text-positive" : "text-Grey-400"
          }`}
        >
          <FaRegCircleCheck /> 1 number
        </li>
      </ul>
    </div>
  );
};

export default StrongPassword;
