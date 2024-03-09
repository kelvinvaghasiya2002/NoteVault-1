import mongoose, { Schema } from "mongoose"


const userSchema = new Schema({
    id : {
        type : 'UUID'
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
})


const User = new mongoose.model("User", userSchema);



export default User;