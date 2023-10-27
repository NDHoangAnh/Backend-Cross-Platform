const genOTP = () => {
  const result = Math.floor(Math.random() * 10000);
  return result;
};

module.exports = genOTP;
