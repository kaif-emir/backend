import jwt from "jsonwebtoken";

export const generateWebToken = (userId , res) => {
    const token = jwt.sign({userId}, process.env.JWT_KEY,{expiresIn: "1h"});
    res.cookie("token", token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
    })
}