import axios from 'axios'
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/logout', {}, {
                withCredentials: true,
            });
            
            dispatch(logout());
            navigate('/login');

        } catch (error) {
            console.log("Failed to logout");
        }
    }   

  return (

    <button onClick={handleLogout} className="px-2 py-1 mx-2 rounded-md bg-blue-600 text-white font-semibold ">Logout</button>
  )
}

export default Logout