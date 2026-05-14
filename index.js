import express from "express";
import authRoutes from "./routes/auth.route.js";
import expenseRoutes from "./routes/expense.route.js";
import budgetRoutes from "./routes/budget.route.js";
import cookieParser from "cookie-parser";
import protectedRoutes from "./middleware/protectedRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/expense", protectedRoutes, expenseRoutes );
app.use("/budget", protectedRoutes, budgetRoutes );

app.get('/', protectedRoutes, (req, res) => {
  res.status(200).json({message : "Welcome to the Expense Tracker API"});
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});