import { useForm } from "react-hook-form";
import { Input, Button } from "../components";
import axios from "axios";

function createTask({ setOpenForm }) {

  const { register, handleSubmit } = useForm();

  const createUserTask = async (data) => {
    try {

      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      if(startDate > endDate) {
        alert("start date cannot be greater than end date");
        return ;      
      }

      const response = await axios.post(
        "http://localhost:3000/create-tasks",
        data,
        {
          Credentials: true,
        }
      );
      if (response.data) {
        alert("Task created successfully");
      } else {
        alert("Failed to create task");
      }

      setOpenForm(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
      <div>
        <form
          onSubmit={handleSubmit(createUserTask)}
          className=" text-gray-500 mt-8"
        >
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
            <h1 className="flex justify-center items-center font-semibold ">
              Create Task
            </h1>

            <div className="">
              <Input
                label="Task Name"
                type="text"
                placeholder="Enter task name"
                className="w-full mt-2 mb-4"
                {...register("name", { required: true })}
              />
            </div>

            <div>
              <Input
                label="Start Date "
                type="date"
                className="w-full mt-2 mb-4"
                {...register("startDate", { required: true })}
              />
            </div>

            <div>
              <Input
                label="End Date"
                type="date"
                className="w-full mt-2 mb-4"
                {...register("endDate", { required: true })}
              />
            </div>

            <div>
              <Input
                label="Category"
                type="select"
                className="w-full mt-2 mb-4"
                {...register("category", { required: true })}
                options={[
                  { value: "Work", label: "Work" },
                  { value: "Personal", label: "Personal" },
                  { value: "Urgent", label: "Urgent" },
                ]}
              />
            </div>

            <div>
              <Input
                label="Priority"
                type="radio"
                className="w-full mt-2 mb-4"
                {...register("priority", { required: true })}
                options={[
                  { value: "High", label: "High" },
                  { value: "Medium", label: "Medium" },
                  { value: "Low", label: "Low" },
                ]}
              />
            </div>

            <div>
              <Input
                label="Status"
                type="radio"
                className="w-full mt-2 mb-4"
                {...register("status", { required: true })}
                options={[
                  { value: "Pending", label: "Pending" },
                  { value: "In Progress", label: "In Progress" },
                  { value: "Completed", label: "Completed" },
                ]}
              />
            </div>
            <div className="flex flex-row justify-between">
              <Button
                type="submit"
                className=" w-24 px-2 py-1 mx-2 rounded-md bg-blue-500 text-white font-semibold  hover:bg-blue-700 "
                children="Submit"
              />

              <Button
                onClick={handleClose}
                className=" w-24 px-2 py-1 mx-2 rounded-md bg-red-500 text-white font-semibold  hover:bg-red-700 "
                children="cancel"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default createTask;
