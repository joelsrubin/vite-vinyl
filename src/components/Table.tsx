import { useEffect, useState } from "react";
import Up from "/chevron_up.png";
import Down from "/chevron_down.png";
import { isMobile } from "react-device-detect";

type SortBy =
  | ""
  | "title"
  | "artists"
  | "year"
  | "genre"
  | "label"
  | "format"
  | "styles";

function finalFormat(d: any) {
  return d.map((row: any) => {
    const formattedRow: any = {};
    Object.keys(row).forEach((key) => {
      const value = row[key];
      if (typeof value === "object") {
        formattedRow[key] = value.name;
      } else {
        formattedRow[key] = value;
      }
    });
    return formattedRow;
  });
}

function formatRows(data: any) {
  return data.map((row: any) => {
    const formattedRow: any = {};
    Object.keys(row).forEach((key) => {
      const value = row[key];
      if (Array.isArray(value)) {
        formattedRow[key] = value[0];
      } else if (typeof value === "string") {
        formattedRow[key] = value;
      } else if (typeof value === "object") {
        formattedRow[key] = value.name;
      } else if (typeof value === "number") {
        if (value === 0) {
          formattedRow[key] = "";
        } else {
          formattedRow[key] = value;
        }
      }
    });
    return formattedRow;
  });
}

export function Table({ items }: { items: Release[] }) {
  const [sortBy, setSortBy] = useState<SortBy>("");
  const [sortedElements, setSortedElements] = useState([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searched, setSearched] = useState("");
  const [originalItems, setOriginalItems] = useState([...items]);

  function handleSort(val: SortBy) {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortBy(val);
  }

  const omittedBasicInformation = [
    "cover_image",
    "id",
    "master_id",
    "master_url",
    "resource_url",
    "thumb",
  ];

  const mobileContent = ["title", "artists"];

  const headers = Object.keys(originalItems[0].basic_information).filter((h) =>
    isMobile ? mobileContent.includes(h) : !omittedBasicInformation.includes(h)
  );

  // extract the row data for each album
  const rows = originalItems.map((album) => {
    const row: any = {};
    headers.forEach((header: any) => {
      //@ts-ignore
      row[header] = album.basic_information[header];
    });
    return row;
  });

  const data = formatRows(rows);
  const final = finalFormat(data);
  const elements = sortBy ? sortedElements : final;

  useEffect(() => {
    setSortedElements(
      final.sort((a: any, b: any) => {
        if (a[sortBy] < b[sortBy]) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a[sortBy] > b[sortBy]) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      })
    );
  }, [sortDirection, originalItems]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearched(e.target.value);
  }

  useEffect(() => {
    if (!searched) {
      setOriginalItems([...items]);
    }
    if (searched) {
      const searchables = [...items];
      const filteredAlbums = searchables.filter(
        (album) =>
          album.basic_information.title.toLowerCase().includes(searched) ||
          album.basic_information.artists
            .map((artist) => artist.name.toLowerCase())
            .join(" ")
            .includes(searched)
      );
      if (filteredAlbums.length) {
        setOriginalItems(filteredAlbums);
      }
    }
  }, [searched]);

  return (
    <div>
      <div className="flex justify-center items-center my-10">
        <input
          type="text"
          placeholder={`${isMobile ? "search" : "search by artist or title"}`}
          className="m-5 p-5 border-none text-center"
          onChange={handleSearch}
          onBlur={handleSearch}
          value={searched}
        />
      </div>
      <table className="flex justify-center mt-10 font-mono ">
        <thead>
          <tr>
            {headers.map((hdr) => (
              <th
                key={hdr}
                className={`hover:underline text-left cursor-pointer ${
                  hdr === sortBy && "underline"
                }`}
                onClick={() => handleSort(hdr as SortBy)}
              >
                <div className="flex flex-row px-10">
                  {hdr.toUpperCase()}
                  {hdr === sortBy && (
                    <img
                      src={sortDirection === "asc" ? Up : Down}
                      alt="up"
                      height={20}
                      width={20}
                      style={{
                        display: "inline",
                        marginLeft: "0.5rem",
                        fontWeight: "bold",
                      }}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
          {elements.map((row: any, i: number) => (
            <tr key={i} className="odd:bg-slate-100">
              {Object.keys(row).map((key) => (
                <td key={key} className="px-10 py-5">
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
}
