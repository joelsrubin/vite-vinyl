import { useState } from "react";
import { useQuery } from "react-query";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import { HomePage } from "./pages/Homepage";
import Library from "./pages/Library";

const KEY = "QjMwskBJVDuuVwHxmJuI";
const SECRET = "oJQZXITXAiAYDBdzvOUgdKIoWnTLvlQn";
// const USERNAME = "zaqmiller";

export async function fetchAlbums(
  userName: string | number
): Promise<Info | undefined> {
  const data = await fetch(
    `https://api.discogs.com/users/${userName}/collection/folders/0/releases?&per_page=100&key=${KEY}&secret=${SECRET}`
  );
  return await data.json();
}
export default function App() {
  const [userName, setUserName] = useState<string | number>("joelsrubin");
  const { data, refetch, isLoading } = useQuery(
    "albums",
    async () => await fetchAlbums(userName)
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              userName={userName}
              refetch={refetch}
              setUserName={setUserName}
            />
          }
        />
        <Route
          path="/library"
          element={<Library data={data} userName={userName} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
