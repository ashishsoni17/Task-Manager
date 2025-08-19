import api from "../api.js";
import { useState, useEffect } from "react";

function Dashboard() {

  const [taskCount, setTaskCount] = useState({
    "In Progress": 0,
    "Pending": 0,
    "Completed": 0,
  });

  useEffect(() => {
    async function fetchtasks() {
      try {
        const response = await api.get("/get-tasks", {
          withCredentials: true,
        });

        const fetchedTasks = response.data.tasks;

        if (response.status === 200) {

          const countsMap = new Map();

          fetchedTasks.forEach((category) => {
            category.tasks.forEach((task) => {
              console.log("Task status:", task.status);
              countsMap.set(task.status, (countsMap.get(task.status) || 0) + 1);
            });
          });

          const countsArray = Object.fromEntries(countsMap);
          setTaskCount(countsArray);

          
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchtasks();
  }, []);

  return (
    <div className="w-full h-full border-1 border-gray-200 bg-gray-100 rounded-2xl flex flex-col p-2">
      <div className="w-full flex justify-between items-center p-2 mb-2">
        <div>
          <h1 className=" text-3xl">Dashboard</h1>
          <p className="text-gray-400">
            Plan, prioritize, and accomplish you tasks with ease.{" "}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <button className="w-26 border-1 border-gray-300 bg-blue-600 text-white rounded-full py-2 text-md hover:bg-white hover:text-blue-700">
            + Tasks
          </button>
        </div>
      </div>

      {/* {4 divs} */}
      <div className="flex w-full h-48 gap-4 ">
        <div className=" z-5 p-4 flex-1 flex flex-col  text-white shadow-sm rounded-2xl bg-gradient-to-bl from-blue-500 to-sky-300">
          <div className="w-full flex flex-row justify-between">
            <h1 className="text-xl">Total Tasks</h1>
            <button className=" flex border-1 border-gray-400 h-8 w-8 justify-center items-center rounded-full bg-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </button>
          </div>
          <h1 className="text-4xl font-semibold mt-8">{(taskCount["In Progress"] || 0) + (taskCount["Pending"] || 0 )+ (taskCount["Completed"] || 0)}</h1>
          <p className="text-gray-200 mt-2">Total Tasks this month</p>
        </div>

        <div className=" z-5 p-4 flex-1 flex flex-col  text-white shadow-sm rounded-2xl bg-gradient-to-bl from-blue-500 to-sky-300">
          <div className="w-full flex flex-row justify-between">
            <h1 className="text-xl">Completed Tasks</h1>
            <button className=" flex border-1 border-gray-400 h-8 w-8 justify-center items-center rounded-full bg-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </button>
          </div>
          <h1 className="text-4xl font-semibold mt-8">{(taskCount["Completed"] || 0)}</h1>
          <p className="text-gray-200 mt-2">Tasks Completed this month</p>
        </div>

        <div className=" z-5 p-4 flex-1 flex flex-col  text-white shadow-sm rounded-2xl bg-gradient-to-bl from-blue-500 to-sky-300">
          <div className="w-full flex flex-row justify-between">
            <h1 className="text-xl">In Progress Tasks</h1>
            <button className=" flex border-1 border-gray-400 h-8 w-8 justify-center items-center rounded-full bg-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </button>
          </div>
          <h1 className="text-4xl font-semibold mt-8">{(taskCount["In Progress"] || 0)}</h1>
          <p className="text-gray-200 mt-2">Tasks In Progress this month</p>
        </div>

        <div className=" z-5 p-4 flex-1 flex flex-col  text-white shadow-sm rounded-2xl bg-gradient-to-bl from-blue-500 to-sky-300">
          <div className="w-full flex flex-row justify-between">
            <h1 className="text-xl">Pending Tasks</h1>
            <button className=" flex border-1 border-gray-400 h-8 w-8 justify-center items-center rounded-full bg-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </button>
          </div>
          <h1 className="text-4xl font-semibold mt-8">{(taskCount["Pending"] || 0)}</h1>
          <p className="text-gray-200 mt-2">Tasks Pending this month</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
