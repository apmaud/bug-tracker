import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        author: {
            type: String,
            require: true,
        },
        comment: {
            type: String,
            require: true,
        },
        ticket: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Ticket",
        },
    },
    { timestamps: true, toJSON: { getters: true } } // timestamps, in this object, will give us when this particular one was created and updated
)

const Comment = mongoose.model("Comment", CommentSchema)
export default Comment;