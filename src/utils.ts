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
