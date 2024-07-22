import { controller, httpPost } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'
import { AuthService } from "../services";
import { TYPES } from "../constants";
import { inject } from "inversify";
import { errorHandle } from "../utils/errorHandler";

@controller("/auth")
export class AuthController {
    constructor(@inject<AuthService>(TYPES.AuthService) private authService:AuthService){}
    @httpPost("/signup")
    async signup(req: Request, res: Response){
        try {
            const userData=req.body;
            const hasedPsswd=bcrypt.hashSync(userData.password,10)
            userData.password=hasedPsswd;
            await this.authService.signup(userData)
            res.status(200).json({status:true,message:"User Signed up Succesfully"})
        } catch (error:any) {
            const errorMessage=errorHandle(error)
            res.status(400).json({status:false,message:errorMessage})
        }
    }
    @httpPost("/login")
    async login(req: Request, res: Response){
        try {
            const userData=req.body;
            const data=await this.authService.login(userData)
            res.status(200).json({status:true,message:data.message,data:data.userData,accessToken:data.accessToken})
        } catch (error:any) {
            const errorMessage=errorHandle(error)
            res.status(400).json({status:false,message:errorMessage})
        }
    }

}