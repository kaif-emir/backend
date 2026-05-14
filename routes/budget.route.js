import Router  from "express";
import { createBudget, budgetAlert } from "../controller/budget.controller.js";

const router = Router({ mergeParams : true});

router.post("/createBudget", createBudget);
router.post("/budgetAlert", budgetAlert);




export default router;