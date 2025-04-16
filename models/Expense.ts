import mongoose, { Schema, model } from "mongoose";

export interface ExpenseDetails {
  category: string;
  amount: number;
}

export interface Expense {
  employeeId: string;
  name: string;
  department: string;
  totalExpenses: number;
  month: string;
  details: ExpenseDetails[];
}

const detailSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
); // Avoids generating _id for each subdocument if not needed

const expenseSchema = new Schema<Expense>(
  {
    employeeId: {
      type: String,
      required: true,
      index: true, // Optional: helps query faster by employeeId
    },
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    totalExpenses: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    details: {
      type: [detailSchema],
      default: [],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const UserExpense =
  mongoose.models?.UserExpense || model<Expense>("UserExpense", expenseSchema);

export default UserExpense;
