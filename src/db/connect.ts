import mongoose from "mongoose"
import config from "config"
export const connectDB=()=>{
    return mongoose.connect(config.get("MONGO_URL"))
}