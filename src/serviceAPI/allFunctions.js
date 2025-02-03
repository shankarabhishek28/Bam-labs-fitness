export function capitalizeFirstLetter(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function prettyPrint(data) {
  console.log(JSON.stringify(data, null, 2));
}
export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options); // Format date
  const formattedTime = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }); // Format time
  return { formattedDate, formattedTime };
};

export function formatDateOnly(dateString) {
  const date = new Date(dateString);

  // Options for formatting just the date
  const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"  // Adjust based on your preferred timezone if needed
  };

  return date.toLocaleDateString("en-US", options);
}
export function convertToAmPm(time24) {
  const [hour, minute] = time24.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12; // Convert 0 or 24 to 12 for AM/PM format
  console.log(`${hour12}:${minute.toString().padStart(2, "0")} ${period}`)
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
}