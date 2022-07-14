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
  data: Info | undefined;
  setData: (data: Info | undefined) => void;
}) {
  const params = useParams();
  const navigate = useNavigate();
  // const { mutateAsync: mutate } = useFetchAlbums();
  const { userName } = params;

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data]);

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
        username: {userName}
      </h1>
      <h1 className="font-mono text-center text-xl mt-2">
        vinyl: {data.pagination.items}
      </h1>

      <nav className="flex justify-center mt-4">
        <MyLink to="/" text="Home" />
      </nav>
      <MyTable items={data.releases} />
    </div>
  );
}

export default Library;
