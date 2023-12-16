const timestamp = "2023-12-16T19:55:05.659Z";
const date = new Date(timestamp);

const options = { weekday: "long" };
const weekday = new Intl.DateTimeFormat("vi-VN", options).format(date);

console.log(weekday); // Output: Thứ Bảy
