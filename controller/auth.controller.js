import {prisma} from "../libs/prisma.js";
import bcrypt from "bcrypt";
import { generateWebToken } from "../libs/utils.js";
export const signup = async (req, res) => {
  const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email, and password are required" });
    }

    const userExist = await prisma.user.findUnique({
        where : { email }
    });
    
    if (userExist) {
        return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long"})
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", typeof hashedPassword);
        const user = await prisma.user.create({
          data: {
            email: email,
            password: hashedPassword,
          },
        });
        generateWebToken(user.id, res);
        return res.status(201).json({ message: "User created successfully", user: { id: user.id, email: user.email } });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const login = async (req, res) => {
    const { email , password } = req.body;
    console.log(req);

    if(!email || !password){
        return res.status(400).json({message : "please provide email and passwors"})
    }

    const userExist = await prisma.user.findUnique({
        where : {email}
    })

    if(!userExist){
        return res.status(400).json({message : "User does not exist"});
    }
    
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if(!isPasswordValid){
        return res.status(400).json({ message: "Password does not match" });
    }

    generateWebToken(userExist.id, res);
    return res.status(200).json({ message : "Login sucessfully"});

}