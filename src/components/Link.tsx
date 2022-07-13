import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { ClipLoader } from "react-spinners";

export function MyLink({
  text = "",
  to = "",
  isLoading = false,
}: {
  text: string;
  to: string;
  isLoading?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`${
        isMobile ? "w-1/2" : "w-1/4"
      } bg-green-200 p-5 rounded hover:bg-green-300 font-mono whitespace-no-wrap text-center text-xl ${
        isLoading ? "pointer-events-none hover:bg-green-200" : ""
      }`}
    >
      {isLoading ? <ClipLoader size={20} /> : text}
    </Link>
  );
}
