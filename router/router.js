const { Router } = require("express");
const router = Router();
const Cnt_Schema = require("../schema/schema");
const fs = require("fs");

router.get("/addContact", (req, res) => {
  res.render("contact_App/addContact", { title: "Add_Contact" });
});

router.get("/style", async (req, res) => {
  fs.readFile("./public/cnt.css", (err, data) => {
    if (err) throw err;
    res.end(data);
  });
});



router.get("/allContact", async (req, res) => {
  let payload = await Cnt_Schema.find().lean();
  res.render("contact_App/cnt_list", { title: "All-contact", payload });
});

router.post("/addContact", async (req, res) => {
  await Cnt_Schema.create(req.body);
  res.redirect("/", 302, {});
});

router.get("/:id", async (req, res) => {
  let payload = await Cnt_Schema.findOne({ _id: req.params.id }).lean();
  res.render("contact_App/single_cnt", { title: "Single Contact", payload });
});

router.get("/edit/:id", async (req, res) => {
  let editData = await Cnt_Schema.findOne({ _id: req.params.id }).lean();
  res.render("contact_App/edit", { title: "edit-contact", editData });
});

router.post("/edit/:id", async (req, res) => {
  let editData = await Cnt_Schema.findOne({ _id: req.params.id });
  editData.fname = req.body.fname;
  editData.lname = req.body.lname;
  editData.nmbr = req.body.nmbr;
  editData.loc = req.body.loc;
  editData.save();

  res.redirect("/api/allContact", 302, {});
});

router.get("/delete/:id", async (req, res) => {
  await Cnt_Schema.deleteOne({ _id: req.params.id }).lean();
  res.redirect("/api/allContact", 302, {});
});

module.exports = router;
