import React, { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const color = [
    "text-red-300",
    "text-blue-300",
    "text-purple-300",
    "text-cyan-300",
    "text-green-300",
    "text-orange-300",
  ];

  function getRandomColor() {
    return color[Math.floor(Math.random() * color.length)];
  }

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:3000/get-tasks", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setTasks(response.data.tasks);
        }
      } catch (error) {
        alert("Error fetching tasks:" + error.message);
      }
    }
    fetchTasks();
  }, []);

  return (
    <div className="w-full h-fit border-1 border-gray-300 rounded-2xl p-2">
      {tasks.map((categoryGroup, index) => (
        <div key={index} className="mb-6">
          <div
            className={` flex flex-row items-center w-full h-10 border border-gray-300 rounded-xl`}
          >
            <ul className="list-disc list-inside mx-2">
              <li className={getRandomColor()}>{categoryGroup.category}</li>
            </ul>
          </div>

          {/* Table */}
          <div>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray text-sm text-gray-500">
                  <th className="px-4 py-2 text-left">Task Name</th>
                  <th className="px-4 py-2 text-left">Start Date</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Priority</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {/* Loop through tasks in this category */}
                {categoryGroup.tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b text-gray-600 border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{task.name}</td>
                    <td className="px-4 py-2">{task.startDate}</td>
                    <td className="px-4 py-2">{task.endDate}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "Medium"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          task.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : task.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
