import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TicketSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
            unique: true,
        },
        project: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Project",
        },
        description: {
            type: String,
            require: true,
        },
        author: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            require: true,
        },
        authorName: {
            type: String,
            require: true,
        },
        assigned: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "User",
                require: true,
            }
        ],
        assignedNames: [
            {
                type: String,
                require: true,
            },
        ],
        comments: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Comment",
            }
        ],
        status: {
            type: String,
            require: true,
        },
        priority: {
            type: String,
            require: true,
        },
        type: {
            type: String,
            require: true,
        },
        time: {
            type: Number,
            require: true,
        },
    },
    { timestamps: true, toJSON: { getters: true } } // timestamps, in this object, will give us when this particular one was created and updated
)

const Ticket = mongoose.model("Ticket", TicketSchema)
export default Ticket;