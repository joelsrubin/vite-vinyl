import { useState } from "react";
import { isMobile } from "react-device-detect";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { fetchAlbums } from "../App";

import DebouncedInput from "../components/DebouncedInput";

export function HomePage({
  userName,
  refetch,
  setUserName,
}: // isLoading,
{
  userName: string | number;
  setUserName: (userName: string | number) => void;
  refetch: () => void;
  // isLoading: boolean;
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    try {
      setIsLoading(true);
      e.preventDefault();
      await refetch();
      await navigate("/library");
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  }
  console.log(isLoading);
  return (
    <div className="font-mono text-center text-xl mt-20">
      <h1>Vinyl Cup</h1>
      <form
        onSubmit={(e) => submitHandler(e)}
        className={`flex flex-col justify-center content-center items-center mt-10 ${
          isMobile ? "" : ""
        }`}
      >
        <DebouncedInput
          onChange={setUserName}
          value={userName}
          className={`p-4 text-lg shadow border border-block font-mono ${
            isMobile ? "w-1/2" : "w-1/4"
          } `}
          placeholder="Enter Discogs Username"
        />
        <button
          role="submit"
          className={`${
            isMobile ? "w-1/2" : "w-1/4"
          } bg-green-200 p-5 rounded hover:bg-green-300 font-mono whitespace-no-wrap text-center text-xl mt-10`}
        >
          {isLoading ? <ClipLoader size={20} /> : "submit"}
        </button>
      </form>
    </div>
  );
}
