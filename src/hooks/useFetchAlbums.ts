import { useMutation } from "react-query";

const KEY = "QjMwskBJVDuuVwHxmJuI";
const SECRET = "oJQZXITXAiAYDBdzvOUgdKIoWnTLvlQn";

const fetchAlbums = async (userName: string): Promise<Release[]> => {
  const data = await fetch(
    `https://api.discogs.com/users/${userName}/collection/folders/0/releases?&per_page=500&key=${KEY}&secret=${SECRET}`
  );

  const json = await data.json();
  let albums = [...json.releases];
  if (json.pagination.urls.next) {
    const nextData = await fetch(json.pagination.urls.next);
    albums = [...albums, ...(await nextData.json()).releases];
  }

  if (json.message) {
    throw new Error("User does not exist or may have been deleted.");
  } else {
    return albums;
  }
};

export const useFetchAlbums = () => {
  return useMutation(fetchAlbums);
};
