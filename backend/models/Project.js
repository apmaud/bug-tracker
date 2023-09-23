import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        contributors: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "User",
                required: true,
            }
        ],
        contributorNames: [
        {
                type:String,
                required:true,
        }
    ],
        tickets: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Ticket",
            }
        ],
    },
    { timestamps: true, toJSON: { getters: true } } // timestamps, in this object, will give us when this particular one was created and updated
)


const Project = mongoose.model("Project", ProjectSchema)
export default Project;