import mongoose, { Schema } from "mongoose"


const noteSchema = new Schema({
    id : {
        type : 'UUID'
    },
    title : {
        type : String
    },
    content : {
        type : String
    }
})


const userSchema = new Schema({
    id : {
        type : 'UUID'
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    notes : {
        type : [noteSchema]
    }
})


const User = new mongoose.model("User", userSchema);



export default User;