import { prisma } from "../libs/prisma.js";


export const createBudget = async (req,res)=>{
    const { userId, limit, month, year, category } = req.body;

    if(!userId || !limit || !month || !year){
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const budget = await prisma.budget.upsert({
            where:{
                userId_category_month_year:{
                    userId,
                    category,
                    month,
                    year
                }
            },
            update: { limit },
            create : { userId, limit, category, month, year },
        });

        res.status(200).json({ budget });
        
    } catch (error) {
        return res.status(500).json({message : "internal server error"})
    }
}

export const budgetAlert = async (req,res) =>{

  const {month , year , userId} = req.body

  if (!month || !year || !userId) {
    return res.json({message : "All fields are required"})
  }

  try {
     
    const budget = await prisma.budget.findMany({
        where : { userId, month, year }
    });

    const spend = await prisma.expense.groupBy({
        by : ["category"],
        where : { userId, month, year },
        _sum : {
            amount : true
        }
    });

    const alert = budget.map((item)=>{
        const spent = spend.find((s)=> s.category === item.category);
        const totalSpent = spent?._sum.amount || 0;
        const exceeded = totalSpent > item.limit; 
        return{
            category : item.category,
            limit : item.limit,
            spent : totalSpent,
            overBy : exceeded ? (totalSpent - item.limit).toFixed(2) : 0
        };
    })
    
    res.status(200).json({ alert });
    
  } catch (error) {
    res.status(500).json({ message : "internal server error"});
  }
    
}
