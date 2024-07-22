import { injectable } from "inversify";
import { IUser } from "../interfaces";
import { User } from "../models";

@injectable()
export class UserService{
    async addUser(userData:IUser){
        try {
            await User.create(userData)
        } catch (error:any) {    
            throw(error)
        }
    }

    async updateUser(userId:string,userData:IUser){
        try {
            const user=await User.findByIdAndUpdate(userId,userData,{new:true})
            if(!user){
                throw new Error('User not found')
            }
            return user
        } catch (error:any) {
            throw(error)
        }
    }

    async deleteUser(userId:string){
        try {
            const user=await User.findByIdAndDelete(userId)
            if(!user){
                throw new Error('User not found')
            }
        } catch (error:any) {
            throw(error)
        }
    }

    async getUsers(){
        try {
            const users=await User.find()
            return users
        } catch (error:any) {
            throw(error)
        }
    }
    
    async getUserById(userId:string){
        try {
            const user=await User.findById(userId)
            if(!user){
                throw new Error('User not found')
            }
            return user
        } catch (error:any) {
            throw(error)
        }
    }
}