function generateRandomFourDigitNumber() {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomNum = generateRandomFourDigitNumber();
console.log("Random four-digit number:", randomNum);
