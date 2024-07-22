import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from 'config'
import { errorHandle } from "../utils/errorHandler";
export class AuthMiddleware extends BaseMiddleware{
    handler(req: Request, res: Response, next: NextFunction): void {
        try {
            const token=req.headers.authorization?.split(" ")[1];
            if(!token){
                throw new Error("USER IS NOT LOGGED IN")
            }
            const decoded=jwt.verify(token,config.get("SECRET_KEY")) as JwtPayload
            req.headers._id=decoded._id ;
            req.headers.role=decoded.role;
            next()
        } catch (error:any) {
            const errorMessage=errorHandle(error)
            res.status(401).json({status:true,message:errorMessage})
        }
    }

}