import { useMutation } from "react-query";

const KEY = "QjMwskBJVDuuVwHxmJuI";
const SECRET = "oJQZXITXAiAYDBdzvOUgdKIoWnTLvlQn";

const fetchAlbums = async (userName: string): Promise<Info> => {
  const data = await fetch(
    `https://api.discogs.com/users/${userName}/collection/folders/0/releases?&per_page=100&key=${KEY}&secret=${SECRET}`
  );

  const json = await data.json();

  if (json.message) {
    throw new Error("User does not exist or may have been deleted.");
  } else {
    return json;
  }
};

export const useFetchAlbums = () => {
  return useMutation(fetchAlbums);
};
