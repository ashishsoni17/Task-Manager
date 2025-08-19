import api from '../api';
import { useForm } from 'react-hook-form';
import { Input } from '../components';
import { Button } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login as AuthLogin} from '../store/authSlice.js';


function Login() {

  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();

  const login = async (data) => {
    try {

      const response = await api.post('/login', data, {
        withCredentials: true
      });


      if (response.data) {
        const userData = response.data;
        dispatch(AuthLogin({ userData }));
        navigate('/dashboard');
      }

    }
    catch (error) {
      alert("Login failed:", error);
    }
  }

  return (
    <div className="w-full flex items-center justify-center bg-white ">
          <div className="w-full max-w-md bg-gray-100 p-10 px-12 my-15 mx-10 rounded-2xl">
            <div className="mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor "
                className="size-7 text-amber-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>
            </div>
            <h2 className="font-semibold text-3xl mb-2">Welcome Back!</h2>
            <p className="text-gray-700 font-light mb-5">
              Enter to get Started focusing on your goals
            </p>

            <form onSubmit={handleSubmit(login)} className="space-y-4">
              <div className="w-full mx-auto max-w-md text-left">
                <Input
                  label="Email"
                  placeholder="Email"
                  type="email"
                  {...register("email", {
                    required: true,
                  })}
                />
                <Input
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                />
                <Button
                  className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  type="submit"
                >
                  Log In
                </Button>
                <div className="flex items-center my-5">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="px-3 text-sm text-gray-500 whitespace-nowrap">
                    Or, Login with
                  </span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>

                <Button className="w-full text-white  hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center flex items-center justify-center border border-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <span className="text-black px-2">Sign up with Google</span>
                </Button>

                <div className="flex flex-row text-sm font-normal justify-center mt-2">
                  <p className="px-2 text-gray-700 font-light ">
                    Don't have an account ?
                    <Link
                      to="/register"
                      className="font-medium text-primary transition-all duration-200 hover:underline ml-1"
                    >
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
  )
}

export default Login