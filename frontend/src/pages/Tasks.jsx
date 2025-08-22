import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Tasks() {


  const searchQuery = useSelector((state) => state.search.query.toLowerCase());
  
  const color = [
    "text-red-400",
    "text-blue-400",
    "text-purple-400",
    "text-cyan-400",
    "text-green-400",
    "text-orange-400",
  ];

  function getRandomColor() {
    return color[Math.floor(Math.random() * color.length)];
  }

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dueDate: "",
    priority: "Low",
    status: "Pending",
  });
  const [showForm, setShowForm] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);


  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:3000/get-tasks", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setTasks(response.data.tasks);
          setFilteredTasks(response.data.tasks);
        }
      } catch (error) {
        alert("Error fetching tasks:" + error.message);
      }
    }
    fetchTasks();
  }, []);

  useEffect( () => {
    if(tasks.length > 0){
      handleSearch(searchQuery);
    }
  },[searchQuery,tasks]) 
  

  const handleSearch = (searchQuery) => {

    if (!searchQuery) {
      setFilteredTasks(tasks);
    }

    const filter = tasks.map( (categoryGroup) => ({
      ...categoryGroup,
      tasks : categoryGroup.tasks.filter( (task) => (
        task.name.toLowerCase().includes(searchQuery)      
      ))
    })
    )
    .filter((categoryGroup) => categoryGroup.tasks.length > 0); 

    setFilteredTasks(filter);
  } ;

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/update-task/${selectedTask._id}`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === selectedTask._id ? { ...task, ...formData } : task
          )
        );
        setShowForm(false);
        setSelectedTask(null);
      }
    } catch (error) {
      alert("Error updating task: " + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/delete-task/${selectedTask._id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== selectedTask._id)
        );
        setShowForm(false);
        setSelectedTask(null);
      }
    } catch (error) {
      alert("Error deleting task: " + error.message);
    }
  };

  return (
    
    <div className="w-full h-fit border-1 border-gray-100 rounded-2xl p-2">
      
      {filteredTasks.length === 0 ? (
        <div className="flex items-center justify-center">
          <div className="w-3/4 h-20 flex items-center justify-center text-gray-400">
            No tasks found.
          </div>
        </div>
      ) :
      filteredTasks.map((categoryGroup, index) => (
        <div key={index} className="mb-6">
          <div
            className={`z-5 shadow-sm hover:shadow-md hover:z-15 flex flex-row items-center w-full h-10 border border-gray-300 rounded-xl`}
          >
            <ul className="list-disc list-inside mx-2">
              <li className={getRandomColor()}>{categoryGroup.category}</li>
            </ul>
          </div>

          {/* Table */}
          <div>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray text-sm text-gray-500 w-full">
                  <th className="px-4 py-2 text-left">Task Name</th>
                  <th className="px-4 py-2 text-left w-1/6">Start Date</th>
                  <th className="px-4 py-2 text-left w-1/6">Due Date</th>
                  <th className="px-4 py-2 text-left w-1/6">Priority</th>
                  <th className="px-4 py-2 text-left w-1/6">Status</th>
                </tr>
              </thead>

              <tbody>
                {/* Loop through tasks in this category */}
                {categoryGroup.tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b text-gray-600 border-gray-200 hover:bg-gray-50"
                    onClick={() => {
                      // Handle task click if needed
                      setSelectedTask(task);
                      setFormData({
                        name: task.name,
                        dueDate: task.endDate,
                        priority: task.priority,
                        status: task.status,
                      });
                      setShowForm(true);
                    }}
                  >
                    <td className="px-4 py-2">{task.name}</td>
                    <td className="px-4 py-2">
                      {new Date(task.startDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(task.endDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
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
  

      {showForm && selectedTask && (
        <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>

            {/* Task Name */}
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border p-2 px-3 w-full mb-3 rounded-lg"
              placeholder="Task Name"
            />

            {/* Due Date */}
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="border p-2 px-3 w-full mb-3 rounded-lg"
            />

            {/* Priority */}
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              className="border p-2 px-3 w-full mb-3 rounded-lg"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            {/* Status */}
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="border p-2 px-3 w-full mb-3 rounded-lg"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-red-500 hover:bg-red-600  text-white px-4 py-2 rounded-lg"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
