function InvoiceForm({
  invoice,
  handleChange,
  items,
  handleItemChange,
  addItem,
  removeItem,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">Invoice Form</h2>

      {/* 🧾 BILLER */}
      <h3 className="font-bold mb-2">Biller Details</h3>

      <input name="billerName" value={invoice.billerName} onChange={handleChange} placeholder="Biller Name" className="w-full border p-2 mb-2" />
      <input name="billerAddress" value={invoice.billerAddress} onChange={handleChange} placeholder="Biller Address" className="w-full border p-2 mb-2" />
      <input name="billerEmail" value={invoice.billerEmail} onChange={handleChange} placeholder="Biller Email" className="w-full border p-2 mb-2" />
      <input name="billerPhone" value={invoice.billerPhone} onChange={handleChange} placeholder="Biller Phone" className="w-full border p-2 mb-2" />

      {/* 👤 CLIENT */}
      <h3 className="font-bold mt-4 mb-2">Client Details</h3>

      <input name="clientName" value={invoice.clientName} onChange={handleChange} placeholder="Client Name" className="w-full border p-2 mb-2" />
      <input name="clientAddress" value={invoice.clientAddress} onChange={handleChange} placeholder="Client Address" className="w-full border p-2 mb-2" />
      <input name="clientEmail" value={invoice.clientEmail} onChange={handleChange} placeholder="Client Email" className="w-full border p-2 mb-2" />

      {/* 📄 META */}
      <input name="invoiceNumber" value={invoice.invoiceNumber} onChange={handleChange} placeholder="Invoice Number" className="w-full border p-2 mb-2" />

      <input type="date" name="issueDate" value={invoice.issueDate} onChange={handleChange} className="w-full border p-2 mb-2" />
      <input type="date" name="dueDate" value={invoice.dueDate} onChange={handleChange} className="w-full border p-2 mb-2" />

      {/* 💰 TAX & DISCOUNT */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <input name="tax" type="number" value={invoice.tax} onChange={handleChange} placeholder="Tax %" className="border p-2" />
        <input name="discount" type="number" value={invoice.discount} onChange={handleChange} placeholder="Discount %" className="border p-2" />
      </div>

      {/* 📦 ITEMS */}
      <h3 className="font-bold mb-2">Items</h3>

      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-2 mb-2">

          <input
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleItemChange(index, "description", e.target.value)}
            className="border p-2"
          />

          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
            className="border p-2"
          />

          <input
            type="number"
            placeholder="Unit Price"
            value={item.unitPrice}
            onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
            className="border p-2"
          />

          <button
            type="button"
            onClick={() => removeItem(index)}
            className="col-span-3 bg-red-500 text-white p-1 rounded"
          >
            Remove
          </button>

        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        + Add Item
      </button>

    </div>
  );
}

export default InvoiceForm;