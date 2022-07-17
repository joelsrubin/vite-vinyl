import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardView from "./pages/CardView";

import { HomePage } from "./pages/Homepage";
import Library from "./pages/Library";
import Menu from "./pages/Menu";

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
        <Route path="/menu/:userName" element={<Menu />} />
        <Route path="/cardView" element={<CardView />} />
      </Routes>
    </BrowserRouter>
  );
}
