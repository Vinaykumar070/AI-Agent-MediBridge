import mongoose, { model, Schema } from "mongoose";

export interface Invoice {
  invoiceNumber: string | number;
  amount: number;
  paidAmount: number;
  invoiceSubmittedDate: string;
}

export interface CustomerDetails {
  customerId: string;
  customerName: string;
  onboardingDate: string;
  invoices: Invoice[];
  balanceLeft: number;
  paymentStatus: string;
  documentsRequired: string[];
  documentsSubmitted: string[];
  remarks: string;
}

const InvoiceSchema = new Schema<Invoice>(
  {
    invoiceNumber: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    invoiceSubmittedDate: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const CustomerSchema = new Schema<CustomerDetails>(
  {
    customerId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    onboardingDate: {
      type: String,
      required: true,
    },
    invoices: {
      type: [InvoiceSchema],
      required: true,
    },
    balanceLeft: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    documentsRequired: {
      type: [String],
      required: true,
    },
    documentsSubmitted: {
      type: [String],
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Customer =
  mongoose.models?.Customer ||
  model<CustomerDetails>("Customer", CustomerSchema);

export default Customer;
