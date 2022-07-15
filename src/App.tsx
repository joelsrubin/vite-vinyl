import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/Homepage";
import Library from "./pages/Library";

export default function App() {
  const [data, setData] = useState<Info | undefined>(undefined);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage setData={setData} />} />
        <Route
          path="/library/:userName"
          element={<Library data={data} setData={setData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
