const express = require("express");
const app = express();

const port = 3000;
const base = `${__dirname}/public`;

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(`${base}/login.html`);
});

app.get("/student", function (req, res) {
  res.sendFile(`${base}/student.html`);
});

app.get("/teacher", function (req, res) {
  res.sendFile(`${base}/teacher.html`);
});

// Handle all other routes with a 404 page
app.get("*", function (req, res) {
  res.sendFile(`${base}/404.html`);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
