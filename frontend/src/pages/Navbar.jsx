import SearchBox from "../components/SearchBox.jsx";
import Logout from "./Logout.jsx";
import { useLocation } from "react-router-dom";
import {useState} from "react";
import CreateTask from "../services/createTask.jsx";
import Button from "../components/Button.jsx";

function Navbar() {

  const location = useLocation();
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="w-full flex flex-row justify-end items-center h-16 shadow-lg">
        
        
        <div className="flex items-center ml-10 w-full ">
          <SearchBox />
        </div>

        {location.pathname !== "/tasks" && <Logout />}
        {location.pathname === "/tasks" && 
        <Button
          onClick={() => setOpenForm(true)}
          className=" w-32 px-2 py-1 mx-2 rounded-md bg-blue-500 text-white font-semibold hover:py-1.5 hover:text-blue-500 hover:bg-white"
          children="Create Task"
        />}

        {openForm && <CreateTask setOpenForm={setOpenForm} />}

      </div>
    </div>
  );
}

export default Navbar;
