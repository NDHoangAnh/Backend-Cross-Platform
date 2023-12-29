const validateTime = (startTime, endTime, listTimeToCheck) => {
  const _startTime = new Date(startTime);
  const _endTime = new Date(endTime);
  const check = listTimeToCheck.map((item) => {
    const checkStartTime = new Date(item?.timeStart);
    const checkEndTime = new Date(item?.timeStart);
    return _endTime < checkStartTime || _startTime > checkEndTime;
  });
  return check.includes(false);
};

module.exports = validateTime;
