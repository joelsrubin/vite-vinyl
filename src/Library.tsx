import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import "./App.css";
import { MyLink } from "./components/Link";
import { Table } from "./components/Table";

function Library() {
  const KEY = "QjMwskBJVDuuVwHxmJuI";
  const SECRET = "oJQZXITXAiAYDBdzvOUgdKIoWnTLvlQn";
  const USERNAME = "joelsrubin";

  async function fetchAlbums() {
    const data = await fetch(
      `https://api.discogs.com/users/${USERNAME}/collection/folders/0/releases?&per_page=100&key=${KEY}&secret=${SECRET}`
    );
    return await data.json();
  }
  const queryClient = useQueryClient();
  const { data: albums, isLoading } = useQuery("albums", fetchAlbums);
  if (isLoading) {
    return <div>loading...</div>;
  } else {
    return (
      <div>
        <h1 className="font-mono text-center text-xl mt-10">vinyl</h1>
        <h1 className="font-mono text-center text-xl">
          total count {albums.pagination.items}
        </h1>

        <nav className="flex justify-center mt-4">
          <MyLink to="/" text="Home" />
        </nav>
        <Table items={albums.releases} />
      </div>
    );
  }
}

export default Library;
