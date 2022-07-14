import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useFetchAlbums } from "./hooks/useFetchAlbums";

import { HomePage } from "./pages/Homepage";
import Library from "./pages/Library";

export default function App() {
  const [userName, setUserName] = useState<string | number>("joelsrubin");
  const { mutateAsync: mutate, data, isSuccess, isLoading } = useFetchAlbums();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              userName={userName}
              mutate={mutate}
              setUserName={setUserName}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/library"
          element={<Library data={data} userName={userName} mutate={mutate} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
