import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index : true
    },
    name : {
        type: String,
        required: true,
        trim: true
    },
    startDate : {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    priority : {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    status : {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    category : {
        type : String,
        enum : [ 'Development' , 'Work', 'Personal', 'Urgent', 'Other' , 'Coding/DSA'],
        default: 'Other',
        index : true 
    }
} , {
    timestamps: true}
)

export const Task = mongoose.model('Task', taskSchema);