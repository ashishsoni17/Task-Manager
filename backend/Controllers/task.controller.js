import { Task } from "../Models/task.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import mongoose from "mongoose";

const createTask = asyncHandler(async (req, res) => {
    const { name, startDate, endDate, priority, status, category } = req.body;

    if (!name || !startDate || !endDate){
        return res.status(400).json({
            message: "Name, start date, and end date are required",
        });
    }

    const task = await Task.create({
        userId: req.user._id,
        name,
        startDate,
        endDate,
        priority,
        status,
        category
    });

    return res.status(201).json({
        message: "Task created successfully",
        task,
    });
})

const getTasks = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    
    if (!userId) {
        return res.status(400).json({
            message: "User ID is required",
        });
    }
    const tasks = await Task.aggregate([
        {
            $match : {
                userId: new mongoose.Types.ObjectId(`${userId}`)
            }
        },
        {
            $group : {
                _id : "$category", tasks: { $push : "$$ROOT"}
            }
        },
        {
            $project: {
                category: "$_id",
                tasks: 1,
                _id: 0
            }
        }
    ]);
    return res.status(200).json({
        message: "Tasks retrieved successfully",
        tasks,
    });
})

const updateTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { name, startDate, endDate, priority, status, category } = req.body;

    const task = await Task.findByIdAndUpdate(taskId,
        { name, startDate, endDate, priority, status, category },
        { new: true, runValidators: true }
    );
    if (!task) {
        return res.status(404).json({
            message: "Task not found",
        });
    }
    return res.status(200).json({
        message: "Task updated successfully",
        task,
    });

})

const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
        return res.status(404).json({
            message: "Task not found",
        });
    }
    return res.status(200).json({
        message: "Task deleted successfully",
    });
}
);

export { createTask, getTasks, updateTask, deleteTask };

