import { useQuery } from "react-query";
import { fetchAlbums } from "../App";
import { MyLink } from "../components/Link";

export function HomePage() {
  const { isLoading } = useQuery("albums", fetchAlbums);
  return (
    <div className="font-mono text-center text-xl mt-20">
      <h1>Vinyl Cup</h1>
      <ul className="mt-20 flex flex-col gap-10 items-center">
        <MyLink to="/library" text="Table View" isLoading={isLoading} />
      </ul>
    </div>
  );
}
