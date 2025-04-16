import UserExpense, { Expense } from "@/models/Expense";

const employeeNames = [
  "Suraj Kumar",
  "Deva",
  "Sameer",
  "Shashank",
  "Abhishek",
  "Shivam",
  "Sijo",
  "Monu Thakur",
  "Sonu Modi",
  "Narendra Modi",
];
``
const createExpenseDetails = () => {
  let res: Expense[] = [];
  for (let i = 0; i < 10; i++) {
    const expenseDetails = {
      employeeId: `EMP${1000 + i}`,
      name: employeeNames[i],
      department: ["Sales", "HR", "IT"][i % 3],
      totalExpenses: Math.floor(Math.random() * 5000) + 500,
      month: "March 2025",
      details: [
        { category: "Travel", amount: Math.floor(Math.random() * 1000) },
        { category: "Meals", amount: Math.floor(Math.random() * 500) },
        { category: "Lodging", amount: Math.floor(Math.random() * 2000) },
      ],
    };

    res.push(expenseDetails);
  }

  return res;
};

export const createExpense = async () => {
  try {
    const userExpense = createExpenseDetails();
    const result = await UserExpense.insertMany(userExpense);
    return result;
  } catch (e: any) {
    console.log(e);
    throw new Error(e?.message ? e?.message : e);
  }
};

export const getEmployeesExpense = async () => {
  try {
    const employeeExpense = await UserExpense.find({});
    return employeeExpense;
  } catch (e: any) {
    console.log(e);
    throw new Error(e?.message ? e?.message : e);
  }
};
