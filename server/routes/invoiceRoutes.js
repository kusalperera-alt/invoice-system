const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getInvoices,
  deleteInvoice,
} = require("../controllers/invoiceController");

router.post("/", createInvoice);
router.get("/", getInvoices);
router.delete("/:id", deleteInvoice);

module.exports = router;