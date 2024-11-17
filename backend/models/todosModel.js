import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            // ตัดช่องว่างหน้าหลังอัตโนมัติ
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            // สถานะของรายการ
            enum: ["in progress", "completed"],
            default: "in progress",
            required: true,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Todo = mongoose.model("todos", todoSchema);