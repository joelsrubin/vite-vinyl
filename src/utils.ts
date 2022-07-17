export function finalFormat(d: any) {
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

export function formatRows(data: any) {
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

export function compare(a: string, b: string) {
  var aTitle = a.toLowerCase(),
    bTitle = b.toLowerCase();

  aTitle = removeArticles(aTitle);
  bTitle = removeArticles(bTitle);

  if (aTitle > bTitle) return 1;
  if (aTitle < bTitle) return -1;
  return 0;
}

function removeArticles(str: string) {
  const words = str.split(" ");
  if (words.length <= 1) return str;
  if (words[0] == "the") return words.splice(1).join(" ");
  return str;
}
