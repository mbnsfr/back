// perfect how to use parse cloud with react : https://www.back4app.com/docs/react-native/parse-sdk/cloud-functions/react-native-cloud-functions
// from https://medium.com/@corradodebari/add-machine-learning-functions-to-parse-platform-through-oracle-autonomous-db-1110c026e46e

// var CONFIG = require('./dbconfig.json');


// let tokenRequest = {
//     url: CONFIG.authUrl,
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'Authorization': 'Bearer <Bearer Token>'
//     },
//     body: {
//         grant_type: 'password',
//         username: CONFIG.username,
//         password: CONFIG.password
//     }
// };


// Parse.Cloud.beforeSave("Customers", (request) => {

//     // ***************************
//     // Authorization Token call
//     // ***************************
//     const score = request.object.get("score");
//     if ((typeof score) === 'undefined') {
//         console.log("get undefined");
//         console.log("----->get Authentication call");
//         Parse.Cloud.httpRequest(tokenRequest).then(function (httpResponse) {
//             let resp = JSON.parse(httpResponse.text);
//             return { 'accessToken': resp.accessToken };
//         }, function (httpResponse) {
//             console.error('Request failed with response code ' + JSON.stringify(httpResponse));
//             return { 'accessToken': null };
//         }).then((token) => {
//             // ***************************
//             // Machine Learning Model call
//             // ***************************
//             console.log("----->prediction call");
//             let obj = request.object.toJSON();
//             delete obj.CUST_ID

//             var options = {
//                 'method': 'POST',
//                 'url': CONFIG.mlFunctionUrl,
//                 'headers': {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                     'Authorization': 'Bearer ' + token.accessToken
//                 },
//                 body: {
//                     inputRecords: [
//                         obj
//                     ],
//                     "topN": 1,
//                     "topNdetails": 1
//                 }
//             };
//         })
//     }
// })