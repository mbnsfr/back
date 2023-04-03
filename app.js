var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var ParseDashboard = require("parse-dashboard");

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

var api = new ParseServer({
    databaseURI: "mongodb://localhost:27017/back", // Connection string for your MongoDB database
    appId: "backmyAppId",
    masterKey: "backmyMasterKey",
    fileKey: "optionalFileKey",
    serverURL: "http://localhost:1337/parse",
    cloud: './cloud/main.js',
    // below added for warnings
    allowClientClassCreation: true,
    allowExpiredAuthDataToken: true,
});

api.start()

app.use("/parse", api.app);
app.use("/dashboard", dashboard);

app.listen(1337);
var httpServer = require('http').createServer(app);
httpServer.listen(4040);
