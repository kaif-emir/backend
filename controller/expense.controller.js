import { prisma } from "../libs/prisma.js";

export const createExpense = async (req,res)=>{
    const { title, amount, category, userId } = req.body;

    if(!title || !amount || !category || !userId){
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await prisma.user.findUnique({
      where: { id : userId },
    });
     console.log(userExist)
    if(!userExist){
        return res.status(400).json({message : "user does not exist"})
    }

    try {

        const expense = await prisma.expense.create({
            data : {
                title :title,
                amount :amount,
                category :category,
                userId :userId,
                month :parseInt( new Date().getMonth() + 1),
                year : parseInt(new Date().getFullYear()),
                userId: userId,
            }
        });

        return res.status(201).json({message : "Expense created successfully", expense});
        
    } catch (error) {
        return res.status(500).json({message : "internal server error"})
    }
}

export const getExpenses = async (req,res)=>{
    const userId = parseInt(req.params.userId);
    const month = parseInt(req.query.month) || parseInt(new Date().getMonth() + 1);
    const year = parseInt(req.query.year) || parseInt(new Date().getFullYear());

    if(!userId){
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const expenses = await prisma.expense.findMany({
          where: { 
            userId : userId,
            month: month,
            year: year
          },
        });

        res.status(200).json({expenses})
    } catch (error) {
        return res.status(500).json({message : "internal server error"})
    }
}

export const deleteExpense = async (req,res)=>{
    const { expenseId } = req.params;
    if(!expenseId){
        return res.status(400).json({ message: "Expense ID is required" });
    }
    try {
        
      const expense =  await prisma.expense.delete({
            where : { id : parseInt(expenseId) }
        })
        return res.status(200).json({message : "Expense deleted successfully"});
    } catch (error) {
        return res.status(500).json({message : "internal server error"})
    }
}

export const updateExpense = async (req,res)=>{
      const { id } = req.params;

      const { title, amount, category } = req.body;

        if (!title || !amount || !category || !id) {
          return res.status(400).json({ message: "All fields are required" });
        }

        try {

           const expenseExist = await prisma.expense.findUnique({
             where: {
               id: parseInt(id),
             },
           });

           if (!expenseExist) {
             return res.status(404).json({
               message: "Expense not found",
             });
           }

            const expenseUpdated =  await prisma.expense.update({
               where: { id: parseInt(id) },
               data: {
                 title: title,
                 amount: amount,
                 category: category,
               },
             });

            return res.status(200).json({message : "Expense updated successfully", expense: expenseUpdated});
        } catch (error) {
            return res.status(500).json({message : "internal server error"})
        }
}

export const ExpenseSummary = async (req,res)=>{
    const userId = parseInt(req.params.userId);
     
    if(!userId){
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const summary = await prisma.expense.groupBy({
            by : ['category'],
            where : { userId : userId },
            _sum : { amount : true},
            orderBy : {
                _sum : {
                    amount : 'desc'
                }
            }
        });
        
        const ExpenseSummary = summary.map((item)=>{
            return{
                category : item.category,
                totalAmount : item._sum.amount
            }
        })

        return res.status(200).json({ ExpenseSummary });
    } catch (error) {
        return res.status(500).json({message : "internal server error"})
    }
}