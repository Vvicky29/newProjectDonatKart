var moment = require("moment");

var TODAY = function () {
  moment().startOf("day");
};

var getTimeDifference = function (startTime, endTime, units) {
  return moment(endTime).diff(moment(startTime), units);
};

module.exports = {
  TODAY: TODAY,
  getTimeDifference: getTimeDifference,
};
