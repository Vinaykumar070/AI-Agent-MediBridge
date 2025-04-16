import Customer from "@/models/Customer";

const dummyCustomerData = [
  {
    customerId: "1",
    customerName: "Acme Corp",
    onboardingDate: "2025-03-05",
    invoices: [{ invoiceNumber: "ACM-001", amount: 7000, paidAmount: 5000 }],
    balanceLeft: 2000,
    paymentStatus: "Partial",
    documentsRequired: ["PAN Card", "GST Certificate"],
    documentsSubmitted: ["PAN Card"],
    remarks: "Follow up for GST",
  },
  {
    customerId: "2",
    customerName: "Zenith Solutions",
    onboardingDate: "2025-03-08",
    invoices: [{ invoiceNumber: "ZEN-102", amount: 12000, paidAmount: 12000 }],
    balanceLeft: 0,
    paymentStatus: "Paid",
    documentsRequired: ["PAN Card", "MSME Certificate"],
    documentsSubmitted: ["PAN Card", "MSME Certificate"],
    remarks: "Completed",
  },
  {
    customerId: "3",
    customerName: "BrightStar Ltd",
    onboardingDate: "2025-03-12",
    invoices: [{ invoiceNumber: "BRS-009", amount: 4000, paidAmount: 1000 }],
    balanceLeft: 3000,
    paymentStatus: "Partial",
    documentsRequired: ["GST Certificate"],
    documentsSubmitted: [],
    remarks: "Urgent doc collection",
  },
  {
    customerId: "4",
    customerName: "Nova Enterprises",
    onboardingDate: "2025-03-15",
    invoices: [{ invoiceNumber: "NOV-123", amount: 9500, paidAmount: 9500 }],
    balanceLeft: 0,
    paymentStatus: "Paid",
    documentsRequired: ["PAN Card"],
    documentsSubmitted: ["PAN Card"],
    remarks: "Smooth onboarding",
  },
  {
    customerId: "5",
    customerName: "FutureTech Pvt Ltd",
    onboardingDate: "2025-03-18",
    invoices: [{ invoiceNumber: "FUT-778", amount: 15000, paidAmount: 5000 }],
    balanceLeft: 10000,
    paymentStatus: "Partial",
    documentsRequired: ["GST Certificate", "Udyam Certificate"],
    documentsSubmitted: ["GST Certificate"],
    remarks: "Partially paid",
  },
  {
    customerId: "6",
    customerName: "EcoNova",
    onboardingDate: "2025-03-20",
    invoices: [{ invoiceNumber: "ECO-302", amount: 5000, paidAmount: 0 }],
    balanceLeft: 5000,
    paymentStatus: "Unpaid",
    documentsRequired: ["PAN Card"],
    documentsSubmitted: [],
    remarks: "Need payment reminder",
  },
  {
    customerId: "7",
    customerName: "PixelWave Studios",
    onboardingDate: "2025-03-22",
    invoices: [{ invoiceNumber: "PIX-456", amount: 3000, paidAmount: 3000 }],
    balanceLeft: 0,
    paymentStatus: "Paid",
    documentsRequired: ["MSME Certificate"],
    documentsSubmitted: ["MSME Certificate"],
    remarks: "Completed",
  },
  {
    customerId: "8",
    customerName: "Omega Systems",
    onboardingDate: "2025-03-24",
    invoices: [{ invoiceNumber: "OMG-200", amount: 10000, paidAmount: 8000 }],
    balanceLeft: 2000,
    paymentStatus: "Partial",
    documentsRequired: ["PAN Card", "GST Certificate"],
    documentsSubmitted: ["PAN Card"],
    remarks: "GST pending",
  },
  {
    customerId: "9",
    customerName: "NeonSpark Ltd",
    onboardingDate: "2025-03-26",
    invoices: [{ invoiceNumber: "NEO-800", amount: 7500, paidAmount: 0 }],
    balanceLeft: 7500,
    paymentStatus: "Unpaid",
    documentsRequired: ["GST Certificate"],
    documentsSubmitted: [],
    remarks: "Cold onboarding",
  },
  {
    customerId: "10",
    customerName: "SwiftHub",
    onboardingDate: "2025-03-29",
    invoices: [{ invoiceNumber: "SWF-090", amount: 6000, paidAmount: 6000 }],
    balanceLeft: 0,
    paymentStatus: "Paid",
    documentsRequired: ["PAN Card", "Udyam Certificate"],
    documentsSubmitted: ["PAN Card", "Udyam Certificate"],
    remarks: "Completed",
  },
];

export const createCustomer = async () => {
  try {
    const result = await Customer.insertMany(dummyCustomerData);
    return result;
  } catch (e: any) {
    console.log(e);
    throw new Error(e?.message ? e?.message : e);
  }
};

export const getCustomer = async () => {
  try {
    const result = await Customer.find({});
    return result;
  } catch (e: any) {
    console.log(e);
    throw new Error(e?.message ? e?.message : e);
  }
};
