"use strict";

var request = require("request-promise");

function fetchDataFromApi(options) {
  return new Promise(function (res, rej) {
    request(options)
      .then(function (response) {
        return res(response);
      })
      .catch(function (err) {
        return rej(err);
      });
  });
}

module.exports = {
  fetchDataFromApi: fetchDataFromApi,
};
