import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { createNewUser, createUsers, getUsers } from "@/services/Users";

export const getEmployeeData = tool(
    async ({ query, n = 10 }) => {
        const users = await getUsers();
        return JSON.stringify({ users, query });
    },
    {
        name: "getEmployeeData",
        description: "Gathers employee details from the HR database",
        schema: z.object({
            query: z.string().describe("The search query"),
            n: z
                .number()
                .optional()
                .default(10)
                .describe("Number of results to return"),
        }),
    }
);


export const createEmployee = tool(
    async ({ query, data }) => {
        try {
            const newEmp = await createNewUser(data);
            return JSON.stringify({ newEmp, query });
        } catch (err) {
            console.log('createEmployee: ERROR', err)
        }
    },
    {
        name: "createEmployee",
        description: "Create New Employee in HR database",
        schema: z.object({
            query: z.string().describe("The search query"),
            data: z.object({
                firstName: z.string(),
                lastName: z.string(),
                employeeId: z.string(),
                username: z.string(),
                position: z.string(),
                skills: z.string().optional(),
                qualification: z.string().optional(),
                email: z.string(),
                mobile: z.number(),
                address: z.string().optional(),
                salary: z.number(),
                dateOfBirth: z.date(),
                joiningDate: z.date(),
                jobDescription: z.string().optional(),
                jobTitle: z.string().optional(),
            }).describe("New Employee Details.")
        }),
    }
);


export const createBulkEmployees = tool(
    async ({ query, n = 10 }) => {
        try {
            const users = await createUsers();
            return JSON.stringify({ query, users });
        } catch (err) {
            console.log('createBulkEmployees: ERROR', err)
        }
    },
    {
        name: "createBulkEmployees",
        description: "Create Bulk Employees's in HR database",
        schema: z.object({
            query: z.string().describe("The search query"),
            n: z
                .number()
                .optional()
                .default(10)
                .describe("Number of results to return"),
        }),
    }
);
