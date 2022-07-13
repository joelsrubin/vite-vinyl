import { useQuery } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "./Homepage";
import Library from "./Library";

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
  const { data } = useQuery("albums", fetchAlbums);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<Library data={data} />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
