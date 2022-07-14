import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import DebouncedInput from "../components/DebouncedInput";

export function HomePage({
  userName,
  mutate,
  setUserName,
  isLoading,
}: {
  userName: string | number;
  setUserName: (userName: string | number) => void;
  mutate: any;
  isLoading: boolean;
}) {
  const navigate = useNavigate();

  const submitHandler = async () => {
    await mutate(userName);
    navigate("/library");
  };

  return (
    <div className="font-mono text-center text-xl mt-20">
      <h1>Vinyl Catalogue</h1>
      <div
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
          onClick={submitHandler}
          className={`${
            isMobile ? "w-1/2" : "w-1/4"
          } bg-green-200 p-5 rounded hover:bg-green-300 font-mono whitespace-no-wrap text-center text-xl mt-10`}
        >
          {isLoading ? <ClipLoader size={20} /> : "submit"}
        </button>
      </div>
    </div>
  );
}
