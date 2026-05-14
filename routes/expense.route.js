import { Router } from "express";

import {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  ExpenseSummary
} from "../controller/expense.controller.js";

const router = Router({ mergeParams : true});

router.post("/createExpense", createExpense);
router.delete("/deleteExpense/:expenseId", deleteExpense);
router.get("/getExpenses/:userId", getExpenses);
router.put("/updateExpense/:id", updateExpense);
router.get("/expenseSummary/:userId", ExpenseSummary);

export default router;