import { useMutation } from "react-query";

const KEY = "QjMwskBJVDuuVwHxmJuI";
const SECRET = "oJQZXITXAiAYDBdzvOUgdKIoWnTLvlQn";

const fetchAlbums = async (userName: string) => {
  const data = await fetch(
    `https://api.discogs.com/users/${userName}/collection/folders/0/releases?&per_page=100&key=${KEY}&secret=${SECRET}`
  );
  return await data.json();
};

export const useFetchAlbums = () => {
  return useMutation(fetchAlbums);
};
