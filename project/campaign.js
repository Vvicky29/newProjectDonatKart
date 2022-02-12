"use strict";

var utils = require("./utils");
var dateTimeUtils = require("./dateTimeUtils");

const url = "https://testapi.donatekart.com/api/campaign";
var options = {
  method: "GET",
  url: url,
  headers: {
    "Content-Type": "application/json",
  },
};

function campaignList() {
  return utils
    .fetchDataFromApi(options)
    .then(function (res) {
      res = JSON.parse(res);
      var arr = [];
      for (var i = 0; i < res.length; i++) {
        var obj = {};
        obj["Title"] = res[i]["title"];
        obj["Total Amount"] = res[i]["totalAmount"];
        obj["Backers Count"] = res[i]["backersCount"];
        obj["End Date"] = res[i]["endDate"];
        arr.push(obj);
      }
      var arr1 = arr.sort((a, b) => {
        return b["Total Amount"] - a["Total Amount"];
      });
      return arr1;
    })
    .catch(function (err) {
      return rej(err);
    });
}

function activeCampaign() {
  return utils
    .fetchDataFromApi(options)
    .then(function (res) {
      res = JSON.parse(res);
      var newArr = res.filter(function (record) {
        return (
          dateTimeUtils.getTimeDifference(
            record["created"],
            dateTimeUtils.TODAY(),
            "days"
          ) <= 30 &&
          dateTimeUtils.getTimeDifference(
            dateTimeUtils.TODAY(),
            record["endDate"],
            "days"
          ) >= 30
        );
      });
      return newArr;
    })
    .catch(function (err) {
      return rej(err);
    });
}

function closedCampaign() {
  return utils
    .fetchDataFromApi(options)
    .then(function (res) {
      res = JSON.parse(res);
      var newArr = res.filter(function (record) {
        return (
          dateTimeUtils.getTimeDifference(
            dateTimeUtils.TODAY(),
            record["endDate"],
            "days"
          ) >= 30 || record["procuredAmount"] >= record["totalAmount"]
        );
      });
      return newArr;
    })
    .catch(function (err) {
      return rej(err);
    });
}

module.exports = {
  campaignList: campaignList,
  activeCampaign: activeCampaign,
  closedCampaign: closedCampaign,
};
