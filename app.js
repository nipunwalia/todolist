const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// let items = [];
// let workitems = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const password= "sugandth123";

mongoose.connect("mongodb+srv://maurice:sugandth123@cluster0.ln5jr.mongodb.net/todolistDB",{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// const listSchema = {
//   name: String,
//   items: [itemsSchema]
// };
//
// const List = mongoose.model("List", listSchema);

const itemsSchema = {
  row: String
};
const Item = mongoose.model("Item", itemsSchema);

const workitemsSchema = {
  row: String
};
const WorkItem = mongoose.model("WorkItem", workitemsSchema);



app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: "long",
    month: "long",
    day: "numeric"
  };

  let day = today.toLocaleDateString("en-US", options);

  Item.find({}, function(err,items){

    res.render("list", {
      listTitle: day,
      nitem: items
    });

  });



});

app.post("/", function(req, res) {

  const newRow = req.body.newItem;

  const item = new Item({
    row: newRow
  });

  item.save();
  res.redirect("/");

});

app.post("/delete", function(req,res){
  const itemid = req.body.checkbox;
  Item.findByIdAndRemove(itemid, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Successfully deleted the checked item");
      res.redirect("/");
    }
  });
});

// app.get("/:CustomListName",function(req,res){
//   const Clistname = req.params.CustomListName;
// });

app.get("/work", function(req, res) {

  WorkItem.find({}, function(err,workitems){
    res.render("list", {
      listTitle: "work list",
      nitem: workitems
  });

});
});

app.post("/work", function(req, res) {
  const newRow = req.body.newItem;

  const workitem = new WorkItem({
    row: newRow
  });
  workitem.save();
  res.redirect("/work");
});

app.listen(process.env.Port || 3000, function() {
  console.log("server is started at port 3000");
});
