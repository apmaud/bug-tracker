import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String, 
            required: true, 
            min: 4, 
            unique: true,
        },
        password: {
            type:String, 
            required: true,
        },
        firstName: {
            type:String, 
            required: true,
        },
        lastName: {
            type:String, 
            required: true,
        }
    },
    { timestamps: true, toJSON: { getters: true } } // timestamps, in this object, will give us when this particular one was created and updated
)

const User = mongoose.model("User", UserSchema)
export default User;