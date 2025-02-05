const express = require("express");
const app = express();
const { connect } = require("mongoose");
let { PORT, MONGODB_URI } = require("./config/index");
//const schema = require("./schema/schema");
const routing=require('./router/router.js')

const { engine } = require("express-handlebars");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(express.urlencoded({extended:true}))

let connectDb = async () => {
  await connect(MONGODB_URI);
  console.log("mongodb connected");
};
connectDb();

app.get("/", (req, res) => {
  res.render("home", { title: "Home Page" });
});

app.get("/home", (req, res) => {
  res.render("home", { title: "Add_Contact page" });
});

app.use('/api',routing)


app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server running on port");
});
