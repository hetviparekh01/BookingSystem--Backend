import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'
import { injectable } from "inversify";
import { IUser } from '../interfaces';
import { User } from '../models';
@injectable()
export class AuthService{
   async signup(userData:IUser){
        try {            
            await User.create(userData)
        } catch (error:any) {
            throw(error)
        }
   }

   async login(userData:IUser){
    try {
        const user=await User.findOne({email:userData.email})
        if(!user){
            throw new Error('User not found')
        }
        const isValidate=bcrypt.compareSync(userData.password,user.password)
        if(!isValidate){
            throw new Error('Invalid credentials')
        }
        const payload={
            _id:user._id,
            role:user.role
        }
        const token=jwt.sign(payload,config.get("SECRET_KEY") as string,{expiresIn:'3d'})

        return {message:"User logged in successfully",userData:user,accessToken:token}
    } catch (error:any) {
        throw(error)
    }
   }
}