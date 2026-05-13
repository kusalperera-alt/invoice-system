function SavedInvoices({ invoices = [], onLoad, onDelete }) {
  return (
    <div className="bg-white p-6 mt-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Saved Invoices
      </h2>

      {/* EMPTY STATE FIX */}
      {invoices.length === 0 ? (
        <p className="text-gray-500">
          No saved invoices found.
        </p>
      ) : (
        invoices.map((inv) => (
          <div
            key={inv._id}
            className="border p-3 mb-3 rounded"
          >

            {/* DEBUG SAFE DISPLAY */}
            <p className="font-semibold">
              {inv.invoiceNumber || "No Invoice Number"}
            </p>

            <p className="text-gray-600">
              {inv.clientName || "No Client Name"}
            </p>

            {/* ACTION BUTTONS */}
            <div className="mt-2 flex gap-2">

              <button
                onClick={() => {
                  console.log("LOAD INVOICE:", inv);
                  onLoad(inv);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Load
              </button>

              <button
                onClick={() => {
                  console.log("DELETE CLICKED ID:", inv._id);

                  if (!inv._id) {
                    console.log("❌ Missing ID");
                    return;
                  }

                  onDelete(inv._id);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default SavedInvoices;