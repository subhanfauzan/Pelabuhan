const express = require("express");
const router = express.Router();
const DpiModel = require("../model/DpiModel");

router.get("/", async (req, res, next) => {
  try {
    let rows = await DpiModel.getAll();
    res.render("dpi/index", { data: rows });
  } catch (error) {
    next(error);
  }
});

router.get("/create", (req, res) => {
  res.render("dpi/create");
});

router.post("/store", async (req, res, next) => {
  try {
    const dpiData = req.body;
    await DpiModel.store(dpiData);
    req.flash("success", "Berhasil menyimpan data dpi");
    res.redirect("/dpi");
  } catch (error) {
    req.flash("error", "Gagal menyimpan data dpi");
    res.redirect("/dpi");
  }
});

router.get("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let rows = await DpiModel.getById(id);
    res.render("dpi/edit", {
      id: id,
      nama_dpi: rows[0].nama_dpi,
      luas: rows[0].luas,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const dpiData = req.body;
    await DpiModel.update(id, dpiData);
    req.flash("success", "Berhasil menyimpan data dpi");
    res.redirect("/dpi");
  } catch (error) {
    req.flash("error", "Gagal menyimpan data dpi");
    res.redirect("/dpi");
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await DpiModel.delete(id);
    req.flash("success", "Berhasil menghapus data dpi");
    res.redirect("/dpi");
  } catch (error) {
    req.flash("error", "Gagal menghapus data dpi");
    res.redirect("/dpi");
  }
});

module.exports = router;
