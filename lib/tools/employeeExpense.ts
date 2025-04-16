import { createExpense, getEmployeesExpense } from "@/services/Expense";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const createEmployeesExpense = tool(
  async ({ query, n = 10 }) => {
    try {
      const expenseData = await createExpense();
      return JSON.stringify({ query, expenseData });
    } catch (e) {
      console.log(e);
    }
  },
  {
    name: "createEmployeeExpense",
    description: "Generate mock expense data for employees",
    schema: z.object({
      query: z.string().describe("The search query or use-case description"),
      n: z
        .number()
        .optional()
        .default(10)
        .describe("Number of results to return"),
    }),
  }
);

export const employeesExpense = tool(
  async ({ query, n = 10 }) => {
    try {
      const employeeExpense = await getEmployeesExpense();
      return JSON.stringify({ query, employeeExpense });
    } catch (e) {
      console.log(e);
    }
  },
  {
    name: "getEmployeesExpense",
    // description: "list of employees with the highest expenses",
    // description: "list of employees with the sales department",
    description:
      "Fetches a list of employees' expense data. Can handle queries such as: 'top 5 highest expenses', 'employees in Sales department', 'sorted by meals expense', or 'search by employee name'.",
    schema: z.object({
      query: z
        .string()
        .describe(
          "The natural language search query, such as 'highest expense', 'Sales department', 'top 3 by meals', or 'name is Suraj'"
        ),
      n: z
        .number()
        .optional()
        .default(10)
        .describe("Number of results to return"),
    }),
  }
);
