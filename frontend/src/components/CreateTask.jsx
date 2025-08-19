import React from "react";
import { useForm } from "react-hook-form";

function CreateTask() {
  const { register, handleSubmit } = useForm();

  const createTask = async (data) => {
    try {
      const response = "response from backend API to create a task";
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit(createTask)}>
        <h1>Create Task +</h1>
        <input
          type="text"
          placeholder="Task Name"
          {...register("taskName", { required: true })}
          className="border p-2 rounded mb-4 w-full"
        />
        <input
          type="date"
          {...register("startDate", { required: true })}
          className="border p-2 rounded mb-4 w-full"
        />
        <input
          type="date"
          {...register("dueDate", { required: true })}
          className="border p-2 rounded mb-4 w-full"
        />
        <select
          {...register("priority", { required: true })}
          className="border p-2 rounded mb-4 w-full"
        >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <select
          {...register("status", { required: true })}
            className="border p-2 rounded mb-4 w-full"
        >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Completed</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
            Create Task
        </button>
        <button
          type="button"
          className="bg-gray-300 text-black p-2 rounded w-full mt-2"
          onClick={() => console.log("Cancel")}
        >
          Cancel
        </button>

      </form>
    </div>
  );
}

export default CreateTask;
