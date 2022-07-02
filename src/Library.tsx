import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchAlbums } from "./App";

import "./App.css";
import { MyLink } from "./components/Link";
import { Table } from "./components/Table";

function Library() {
  const queryClient = useQueryClient();
  const albums: Info | undefined = queryClient.getQueryData("albums");

  return (
    <div>
      <h1 className="font-mono text-center text-xl mt-10">vinyl</h1>
      <h1 className="font-mono text-center text-xl">
        total count {albums!.pagination.items}
      </h1>

      <nav className="flex justify-center mt-4">
        <MyLink to="/" text="Home" />
      </nav>
      <Table items={albums!.releases} />
    </div>
  );
}

export default Library;
