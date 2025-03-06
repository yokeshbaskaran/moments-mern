export const getTimeAgo = (isoTimestamp) => {
  const time = new Date(isoTimestamp);
  const now = new Date();
  const seconds = Math.floor((now - time) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const { label, seconds: unit } of intervals) {
    const count = Math.floor(seconds / unit);
    if (count >= 1) {
      return `${count} ${label}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};
