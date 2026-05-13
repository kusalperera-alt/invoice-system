import { useState, useEffect, useRef } from "react";
import API from "./services/invoiceApi";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import SavedInvoices from "./components/SavedInvoices";
import { useReactToPrint } from "react-to-print";

// UNIQUE INVOICE NUMBER
const generateInvoiceNumber = () => {
  return `INV-${Math.floor(1000 + Math.random() * 9000)}`;
};

function App() {
  const [invoice, setInvoice] = useState({
    billerName: "",
    clientName: "",
    invoiceNumber: generateInvoiceNumber(),
    issueDate: "",
    dueDate: "",
    tax: "",
    discount: "",
    notes: "",
  });

  const [items, setItems] = useState([
    { description: "", quantity: "", unitPrice: "" },
  ]);

  const [savedInvoices, setSavedInvoices] = useState([]);

  // ✅ PRINT REF
  const invoiceRef = useRef(null);

  // INPUT
  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  // ITEMS
  const handleItemChange = (i, field, value) => {
    const updated = [...items];
    updated[i][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: "", unitPrice: "" }]);
  };

  const removeItem = (i) => {
    setItems(items.filter((_, index) => index !== i));
  };

  // CALCULATIONS
  const subtotal = items.reduce((acc, item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.unitPrice) || 0;
    return acc + qty * price;
  }, 0);

  const taxRate = Number(invoice.tax) || 0;
  const discountRate = Number(invoice.discount) || 0;

  const taxAmount = (subtotal * taxRate) / 100;
  const discountAmount = (subtotal * discountRate) / 100;
  const total = subtotal + taxAmount - discountAmount;

  // FETCH
  const fetchInvoices = async () => {
    try {
      const res = await API.get("/invoices");
      setSavedInvoices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // SAVE
  const saveInvoice = async () => {
    try {
      if (!invoice.billerName || !invoice.clientName) {
        alert("Please fill required fields");
        return;
      }

      await API.post("/invoices", {
        ...invoice,
        items,
        subtotal,
        taxAmount,
        discountAmount,
        total,
      });

      fetchInvoices();

      setInvoice({
        billerName: "",
        clientName: "",
        invoiceNumber: generateInvoiceNumber(),
        issueDate: "",
        dueDate: "",
        tax: "",
        discount: "",
        notes: "",
      });

      setItems([{ description: "", quantity: "", unitPrice: "" }]);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteInvoice = async (id) => {
    try {
      await API.delete(`/invoices/${id}`);
      fetchInvoices();
    } catch (err) {
      console.log(err);
    }
  };

  // LOAD
  const loadInvoice = (inv) => {
    setInvoice(inv);
    setItems(inv.items || []);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // ✅ PRINT FIX (WORKING VERSION)
  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice-${invoice.invoiceNumber}`,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">

        {/* FORM */}
        <div>
          <InvoiceForm
            invoice={invoice}
            handleChange={handleChange}
            items={items}
            handleItemChange={handleItemChange}
            addItem={addItem}
            removeItem={removeItem}
          />

          <button
            onClick={saveInvoice}
            className="bg-green-600 text-white w-full py-3 mt-4"
          >
            Save Invoice
          </button>

          <button
            onClick={handlePrint}
            className="bg-black text-white w-full py-3 mt-2"
          >
            Print / PDF
          </button>
        </div>

        {/* PREVIEW */}
        <div ref={invoiceRef}>
          <InvoicePreview
            invoice={invoice}
            items={items}
            subtotal={subtotal}
            taxAmount={taxAmount}
            discountAmount={discountAmount}
            total={total}
          />
        </div>

      </div>

      {/* SAVED INVOICES */}
      <SavedInvoices
        invoices={savedInvoices}
        onLoad={loadInvoice}
        onDelete={deleteInvoice}
      />

    </div>
  );
}

export default App;