const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static(__dirname));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };
  const jSonData = JSON.stringify(data);

  var url = "https://us14.api.mailchimp.com/3.0/lists/a2dfe15ba4";

  var options = {
    method: "POST",
    auth: "dave1:5da7893448c9fd1fe6d5106ed643f10a-us14",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });
  request.write(jSonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server Running SuccessFully");
});

//ApiKey
//5da7893448c9fd1fe6d5106ed643f10a-us14
//a2dfe15ba4
