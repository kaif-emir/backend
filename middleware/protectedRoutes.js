import jwt from "jsonwebtoken"

 const protectedRoutes = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message : "Unauthorized token not found"});
    }
    const decoded = jwt.verify(token,process.env.JWT_KEY);
    if(!decoded){
        return res.status(401).json({message : "Unauthorized invalid token"});
    }
    req.userId = decoded.userId;
    next();
}

export default protectedRoutes;