import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "../App.css";
import { MyLink } from "../components/Link";
import { MyTable } from "../components/Table";
import { useFetchAlbums } from "../hooks/useFetchAlbums";

function Library({
  data,
  setData,
}: {
  data: Release[] | undefined;
  setData: (data: Release[] | undefined) => void;
}) {
  const params = useParams();
  const navigate = useNavigate();
  const { mutateAsync } = useFetchAlbums();
  const { userName } = params;

  useEffect(() => {
    if (!data && userName) {
      mutateAsync(userName, {
        onSuccess: (result) => {
          setData(result);
        },
        onError: () => {
          navigate("/");
        },
      });
    }
  }, [data, userName]);

  if (!data) {
    return (
      <div className="flex justify-center content-center items-center min-h-screen">
        <ClipLoader size={40} />
      </div>
    );
  }
  return (
    <div>
      <h1 className="font-mono text-center text-xl mt-10">
        {userName} has {data.length} albums
      </h1>

      <nav className="flex justify-center align-middle items-center gap-6 mt-4 flex-row">
        <MyLink to={`/menu/${userName}`} text="Menu" />
      </nav>
      <MyTable items={data} />
    </div>
  );
}

export default Library;
