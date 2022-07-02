import { useQuery } from "react-query";
import { MyLink } from "./components/Link";

const KEY = "QjMwskBJVDuuVwHxmJuI";
const SECRET = "oJQZXITXAiAYDBdzvOUgdKIoWnTLvlQn";
const USERNAME = "joelsrubin";

export async function fetchAlbums() {
  const data = await fetch(
    `https://api.discogs.com/users/${USERNAME}/collection/folders/0/releases?&per_page=100&key=${KEY}&secret=${SECRET}`
  );
  return await data.json();
}

export default function App() {
  const { isLoading } = useQuery("albums", fetchAlbums);
  return (
    <div className="font-mono text-center text-xl mt-20">
      <h1>Vinyl Cup</h1>
      <ul className="mt-20 flex flex-col gap-10 items-center">
        <MyLink to="/library" text="Table View" isLoading={isLoading} />
        {/* <MyLink to="/cards" text="Card View" state={state} /> */}
      </ul>
    </div>
  );
}
