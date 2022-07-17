import { useMutation } from "react-query";

const KEY = "QjMwskBJVDuuVwHxmJuI";
const SECRET = "oJQZXITXAiAYDBdzvOUgdKIoWnTLvlQn";

async function paginatedFetch(url: string): Promise<Release[]> {
  const response = await fetch(url);
  const data = await response.json();

  if (data.message) {
    throw new Error("User does not exist or may have been deleted.");
  }

  let albums: Release[] = [...data.releases];
  if (data.pagination.pages > 1) {
    let urls = [];

    for (let i = 1; i < data.pagination.pages; i++) {
      urls.push(`${url}&page=${i + 1}`);
    }

    await Promise.all(
      urls.map(async (u) => {
        const response = await fetch(u);
        const data = await response.json();
        albums.push(...data.releases);
      })
    );
  }
  return albums;
}

const fetchAlbums = async (userName: string): Promise<Release[]> => {
  const URL = `https://api.discogs.com/users/${userName}/collection/folders/0/releases?&per_page=250&key=${KEY}&secret=${SECRET}`;
  try {
    const albums = await paginatedFetch(URL);
    return albums;
  } catch (e) {
    throw e;
  }
};

export const useFetchAlbums = () => {
  return useMutation(fetchAlbums);
};
