"use strict";
var express = require("express");
var app = express();
var campaign = require("./campaign");

app.get("/", function (req, res) {
  campaign
    .campaignList()
    .then(function (result) {
      res.send(result);
    })
    .catch(function (err) {
      res.send("Error while Fetching the list");
    });
});

app.get("/active", function (req, res) {
  campaign
    .activeCampaign()
    .then(function (result) {
      res.send(result);
    })
    .catch(function (err) {
      res.send("Error while Fetching the list");
    });
});

app.get("/closed", function (req, res) {
  campaign
    .closedCampaign()
    .then(function (result) {
      res.send(result);
    })
    .catch(function (err) {
      res.send("Error while Fetching the list");
    });
});

app.listen("6677", function () {
  console.log("listening on port 6677");
});
