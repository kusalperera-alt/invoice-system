function InvoicePreview({
  invoice,
  items,
  subtotal,
  taxAmount,
  discountAmount,
  total,
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow">

      {/* 🏢 HEADER (UPDATED COMPANY INFO LAYOUT) */}
      <div className="border-b pb-6 mb-6 flex justify-between">

        {/* LEFT: COMPANY INFO */}
        <div>
          <h2 className="text-2xl font-bold">K Enterprises</h2>

          <div className="text-sm text-gray-600 mt-2 space-y-1">
            <p>55/55 Merry Road</p>
            <p>Colombo, Sri Lanka.</p>
            <p>Email: kenterprises@email.com</p>
            <p>Phone: +94 77 123 4567</p>
          </div>
        </div>

        {/* RIGHT: INVOICE INFO */}
        <div className="text-right text-sm">
          <h1 className="text-3xl font-bold">INVOICE</h1>

          <div className="mt-2 space-y-1 text-gray-700">
            <p>
              <strong>Invoice #:</strong> {invoice.invoiceNumber}
            </p>

            <p>
              <strong>Issue Date:</strong> {invoice.issueDate || "-"}
            </p>

            <p>
              <strong>Due Date:</strong> {invoice.dueDate || "-"}
            </p>
          </div>
        </div>

      </div>

      {/* 👤 CLIENT INFO */}
      <div className="text-sm mb-4">
        <p><strong>Bill To:</strong></p>
        <p>{invoice.clientName}</p>
        <p>{invoice.clientAddress}</p>
        <p>{invoice.clientEmail}</p>
      </div>

      {/* 📦 ITEMS */}
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Description</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Price</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, i) => {
            const qty = Number(item.quantity) || 0;
            const price = Number(item.unitPrice) || 0;

            return (
              <tr key={i} className="border-t">
                <td className="p-2">{item.description}</td>
                <td className="p-2 text-center">{qty}</td>
                <td className="p-2 text-center">${price}</td>
                <td className="p-2 text-center">${qty * price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 💰 TOTALS */}
      <div className="mt-6 flex justify-end">
        <div className="w-72 text-sm space-y-2">

          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Tax ({invoice.tax || 0}%):</span>
            <span>+${taxAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-red-500">
            <span>Discount ({invoice.discount || 0}%):</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>

          <hr />

          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

        </div>
      </div>

    </div>
  );
}

export default InvoicePreview;