import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { login, LoginType } from '../Redux/Slices/authSlice.reducer';
import { useAppDispatch } from '../Helpers/Hooks';

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState<LoginType>({
        email: "",
        password: "",
    });

    function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    async function onLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }

        const logindata: LoginType = {
            email: loginData.email,
            password: loginData.password
        };

        const response = await dispatch(login(logindata));
        if (response?.payload?.success) {
            navigate("/");
        }

        setLoginData({
            email: "",
            password: "",
        });
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
                <h1 className="text-center text-3xl font-bold text-blue-800 mb-6">Login</h1>

                <form noValidate onSubmit={onLogin} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className='font-semibold text-gray-700'>Email</label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email..."
                            className="bg-gray-100 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="password" className='font-semibold text-gray-700'>Password</label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password..."
                            className="bg-gray-100 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>

                    <button type="submit" className='mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-300'>
                        Login
                    </button>

                    <div className="text-center mt-4">
                        <p>Don't have an account? <Link to="/signup" className='text-blue-600 hover:underline'>Sign up</Link></p>
                        <p>Continue without login? <Link to="/" className='text-blue-600 hover:underline'>Homepage</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
