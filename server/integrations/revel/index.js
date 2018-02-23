function getInventoryData(callback) {
  const https = require("https");
  const locationKey = process.env.LOCATION_KEY || "R1ZEBZ7BKH6FY"
  const authKey = process.env.AUTH_KEY || "sq0atp-D6N20L9fuAIu7NbLUY5raA"

  var options = {
  "method": "GET",
  "hostname": "revelsystems.com",
  "path": "/v1/" + locationKey + "/inventory",
  "headers": {
    "cache-control": "no-cache",
    Authorization: "Bearer " + authKey
    }
  }
  const req = https.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        if (body && !!body.toString()) {
        const data = JSON.parse(body.toString());
        return callback(data);
        }
      });
    });
  req.end();
}

module.exports = {getInventoryData}
