import { inject } from "inversify";
import { UserService } from "../services";
import { Request, Response, NextFunction } from "express";
import { TYPES } from "../constants";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { errorHandle } from "../utils/errorHandler";
import { RoleMiddleWare } from "../middlewares";
import bcrypt from 'bcrypt'

@controller("/user",TYPES.AuthMiddleware)
export class UserController{
    constructor(@inject<UserService>(TYPES.UserService) private userService: UserService) { }

    @httpPost("/adduser",RoleMiddleWare(['admin']))
    async adduser(req: Request, res: Response) {
        try {
            const userData=req.body;
            await this.userService.addUser(userData);
            res.status(201).json({ status: true, message: "user added successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpPut("/updateuser/:id",RoleMiddleWare(['admin']))
    async updateuser(req: Request, res: Response) {
        try {
            const userData = req.body;
            const id = req.params.id;
            const hasedPsswd=bcrypt.hashSync(userData.password,10)
            userData.password=hasedPsswd;
            await this.userService.updateUser(id, userData);
            res.status(201).json({ status: true, message: "user updated successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    
    @httpPut("/updateuser",RoleMiddleWare(['admin']))
    async updateParticularUser(req: Request, res: Response) {
        try {
            const userData = req.body;
            const hasedPsswd=bcrypt.hashSync(userData.password,10)
            userData.password=hasedPsswd;
            await this.userService.updateUser(req.params.id, userData);
            res.status(201).json({ status: true, message: "user updated successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }


    @httpDelete("/deleteuser/:id",RoleMiddleWare(['admin']))
    async deleteuser(req: Request, res: Response) {
        try {
            await this.userService.deleteUser(req.params.id);
            res.status(201).json({ status: true, message: "user deleted successfully!" });
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpGet("/getusers",RoleMiddleWare(['admin']))
    async getusers(req: Request, res: Response) {
        try {
            const users = await this.userService.getUsers();
            res.status(201).json({ status: true, data: users })
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }

    @httpGet("/getuserById/:id",RoleMiddleWare(['admin','user']))
    async getuserById(req: Request, res: Response) {
        try {
            const user = await this.userService.getUserById(req.params.id);
            res.status(201).json({ status: true, data: user })
        } catch (error: any) {
            const errorMessage = errorHandle(error)
            res.status(400).json({ status: false, message: errorMessage })
        }
    }
}