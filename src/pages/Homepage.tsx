import { useState } from "react";
import { isMobile } from "react-device-detect";

import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import DebouncedInput from "../components/DebouncedInput";
import { getMobileStyle } from "../constants";
import { useFetchAlbums } from "../hooks/useFetchAlbums";

export function HomePage({
  setData,
}: {
  setData: (data: Info | undefined) => void;
}) {
  const [userName, setUserName] = useState<string>("joelsrubin");
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useFetchAlbums();

  const submitHandler = async (event: any) => {
    mutateAsync(userName, {
      onSuccess: (result) => {
        setData(result);
        navigate(`/library/${userName}`);
      },
      onError: (e: any) => {
        setError(e);
      },
    });
  };

  return (
    <div className="font-mono text-center text-xl mt-20 max-h-100 flex flex-col justify-evenly">
      <h1>Vinyl Catalogue</h1>

      <div
        className={`flex flex-col justify-center content-center items-center mt-10 ${
          isMobile ? "" : ""
        }`}
      >
        <DebouncedInput
          onChange={(e) => {
            setError(null);
            setUserName(e);
          }}
          debounce={0}
          value={userName}
          className={`p-4 text-lg shadow border-2 border-block ${
            error && "border-red-400"
          } font-mono ${getMobileStyle(isMobile)} `}
          placeholder="username"
          error={error}
        />
        <label className={`text-xs text-left mt-2 ${getMobileStyle(isMobile)}`}>
          Enter A Discogs Username
        </label>
        <img
          src="https://fav.farm/%F0%9F%92%BF"
          alt="discogs logo"
          className={`m-10 ${
            isMobile ? "h-1/2 w-1/2" : "h-40 w-40"
          } animate-spin-slow`}
        />
        <button
          role="submit"
          onClick={submitHandler}
          className={`${getMobileStyle(
            isMobile
          )} bg-green-200 p-5 rounded hover:bg-green-300 font-mono whitespace-no-wrap text-center text-xl mt-10 ${
            isLoading ? "pointer-events-none touch-none hover:bg-green-200" : ""
          }`}
        >
          {isLoading ? <ClipLoader size={20} /> : "submit"}
        </button>
      </div>
    </div>
  );
}
