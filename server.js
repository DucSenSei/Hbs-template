const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cal = require("./caculator.js");
const hbs = require("express-handlebars");

app.engine(
  ".hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "views/layouts/",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.render("cal");
});

app.post("/", (req, res) => {
  const soA = Number(req.body.soA);
  const soB = Number(req.body.soB);
  const operator = req.body.operator;
  let result = 0;

  switch (operator) {
    case "cong":
      result = cal.add(soA, soB);
      break;
    case "tru":
      result = cal.sub(soA, soB);
      break;
    case "nhan":
      result = cal.mul(soA, soB);
      break;
    case "chia":
      result = cal.div(soA, soB);
      break;
  }
  res.render("cal", {
    soA,
    soB,
    operator,
    result,
  });
});

app.listen(8080);
