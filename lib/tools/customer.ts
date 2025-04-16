import { createCustomer, getCustomer } from "@/services/Customer";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const createCustomerOnboarding = tool(
  async ({ query, n = 10 }) => {
    try {
      const customerData = await createCustomer();
      return JSON.stringify({ query, customerData });
    } catch (e) {
      console.log(e);
      return JSON.stringify({ error: "Error creating customer data:", query });
    }
  },
  {
    name: "createCustomerOnboarding",
    description: "create Customer onboarding data",
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

export const getCustomerDetails = tool(
  async ({ query, n = 10 }) => {
    try {
      const customerData = await getCustomer();
      return JSON.stringify({ query, customerData });
    } catch (e) {
      console.log(e);
      return JSON.stringify({ error: "Error fetching customer data:", query });
    }
  },
  {
    name: "getCustomerDetails",
    description:
      "Fetches a list of customer details. Supports queries such as: 'paid customers', 'unpaid customers', 'partially paid customers', 'customers with balance left', 'filters by invoice amount', or 'by month'.",
    schema: z.object({
      query: z
        .string()
        .describe(
          "Search filter for retrieving customer details, such as 'paid customers', 'unpaid customers', 'month, 'partial payments', 'balance > 5000', or 'invoice amount > 10000'"
        ),
      n: z
        .number()
        .optional()
        .default(10)
        .describe("Number of results to return"),
    }),
  }
);
