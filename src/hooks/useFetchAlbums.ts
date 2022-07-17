import { useMutation } from "react-query";

const KEY = "QjMwskBJVDuuVwHxmJuI";
const SECRET = "oJQZXITXAiAYDBdzvOUgdKIoWnTLvlQn";

async function recursiveFetch(url: string): Promise<Release[]> {
  const response = await fetch(url);
  const data = await response.json();

  if (data.message) {
    throw new Error("User does not exist or may have been deleted.");
  }

  if (data.pagination.urls.next) {
    const nextData = await recursiveFetch(data.pagination.urls.next);
    return [...data.releases, ...nextData];
  }
  return data.releases;
}

const fetchAlbums = async (userName: string): Promise<Release[]> => {
  const URL = `https://api.discogs.com/users/${userName}/collection/folders/0/releases?&per_page=250&key=${KEY}&secret=${SECRET}`;
  try {
    const albums = await recursiveFetch(URL);
    return albums;
  } catch (e) {
    throw new Error("User does not exist or may have been deleted.");
  }
};

export const useFetchAlbums = () => {
  return useMutation(fetchAlbums);
};
