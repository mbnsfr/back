var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var ParseDashboard = require("parse-dashboard");

var api = new ParseServer({
    databaseURI: "mongodb://localhost:27017/back", // Connection string for your MongoDB database
    appId: "backmyAppId",
    masterKey: "backmyMasterKey",
    fileKey: "optionalFileKey",
    serverURL: "http://localhost:1337/parse",
    // below added for warnings
    allowClientClassCreation: true,
    allowExpiredAuthDataToken: true,
    //future call
    // cloud: './cloud/main.js', // Path to your Cloud Code
});


var options = { allowInsecureHTTP: false };

var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:1337/parse",
            "appId": "backmyAppId",
            "masterKey": "backmyMasterKey",
            "appName": "back"
        }
    ],
    "users": [
        {
            "user": "mbnsfr",
            "pass": "1qw23er4"
        }
    ]
}, options);

var app = express();

app.use("/dashboard", dashboard);
app.use("/parse", api.app);

var httpServer = require("http").createServer(app);
httpServer.listen(4040);

app.listen(1337);
