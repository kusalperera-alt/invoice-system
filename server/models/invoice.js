const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    // 🧾 BILLER
    billerName: String,
    billerAddress: String,
    billerEmail: String,
    billerPhone: String,

    // 👤 CLIENT
    clientName: String,
    clientAddress: String,
    clientEmail: String,

    // 📄 META
    issueDate: String,
    dueDate: String,

    // 💰
    tax: Number,
    discount: Number,

    // 📝
    notes: String,

    // 📦 ITEMS
    items: Array,

    // 💵 CALCULATIONS
    subtotal: Number,
    taxAmount: Number,
    discountAmount: Number,
    total: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);