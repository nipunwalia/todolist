const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = [];
let workitems = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: "long",
    month: "long",
    day: "numeric"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    listTitle: day,
    nitem: items
  });
});

app.post("/", function(req, res) {
  if (req.body.list === "work list") {
    workitems.push(req.body.newItem);
    res.redirect("/work");
  } else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "work list",
    nitem: workitems
  });
});

app.post("/work", function(req, res) {
  workitems.push(req.body.newItem);
  res.redirect("/work");
});

app.listen(process.env.Port || 3000, function() {
  console.log("server is started at port 3000");
});
