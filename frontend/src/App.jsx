import { Routes, Route } from "react-router-dom";
import { Dashboard, Projects, Tasks, Todo, Help } from "../src/pages/index.js";
import { AuthLayout } from "./components/index.js";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Layout from "./Layout/Layout.jsx";

function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <AuthLayout>
            <Layout />
          </AuthLayout>
        }
      >
        <Route index element={<Dashboard />} /> {/* Default page */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="todo" element={<Todo />} />
        <Route path="help" element={<Help />} />
        
      </Route>
    </Routes>
  );
}

export default App;
