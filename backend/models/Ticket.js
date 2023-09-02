import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TicketSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        author: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
        },
        contributors: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "User",
            }
        ],
        comment: [
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
        project: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Project",
        },
    },
    { timestamps: true, toJSON: { getters: true } } // timestamps, in this object, will give us when this particular one was created and updated
)

const Ticket = mongoose.model("Ticket", TicketSchema)
export default Ticket;