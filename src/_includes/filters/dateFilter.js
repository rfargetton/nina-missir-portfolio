module.exports = function dateFilter(value, format = "DD MMMM YYYY") {
  if (!value) return "";

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;

  const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];

  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  if (format === "MMMM YYYY") {
    return `${month} ${year}`;
  }

  if (format === "YYYY") {
    return String(year);
  }

  return `${day} ${month} ${year}`;
};
