import { Request,Response,NextFunction } from "express"

export const RoleMiddleWare= (roles:string[])=>{
    return  (req: Request, res: Response, next: NextFunction) => {
        const userRole=req.headers.role as string;
        if(!roles.includes(userRole)){
            return res.status(403).json({message: "Access denied! You don't have sufficient permissions."})
        }
        next()
    }
}