import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { isEmail, isValidPassword } from '../Helpers/regexMatcher';
import { createAccount } from '../Redux/Slices/authSlice.reducer';
import { UserData } from "../Redux/Slices/authSlice.reducer";

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState<UserData>({
        fullName: "",
        email: "",
        password: "",
        re_enterPassword:"",
        phoneNumber: ""
    });

    function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    }

    async function createNewAccount(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.phoneNumber) {
            toast.error("Please fill all the details");
            return;
        }

        if(signupData.password != signupData.re_enterPassword){
            toast.error("Enter Same Password in both field");
            return;
        }

        if (signupData.fullName.length < 5) {
            toast.error("Name should be at least 5 characters long");
            return;
        }

        if (!isEmail(signupData.email)) {
            toast.error("Invalid email address");
            return;
        }

        if (!isValidPassword(signupData.password)) {
            toast.error("Password should be 6 - 16 characters long with at least a number and special character");
            return;
        }

        const userData: UserData = {
            fullName: signupData.fullName,
            email: signupData.email,
            password: signupData.password,
            re_enterPassword: signupData.re_enterPassword,
            phoneNumber: signupData.phoneNumber
        };

        const response = await dispatch<any>(createAccount(userData)); 
        if (response?.payload?.success) {
            navigate("/");
        }

        setSignupData({
            fullName: "",
            email: "",
            password: "",
            re_enterPassword:"",
            phoneNumber: ""
        });
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
                <h1 className="text-center text-3xl font-bold text-blue-800 mb-6">Create an Account</h1>

                <form noValidate onSubmit={createNewAccount} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="fullName" className='font-semibold text-gray-700'>Name</label>
                        <input
                            type="text"
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name..."
                            className="bg-gray-100 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                        />
                    </div>
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
                            value={signupData.email}
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
                            value={signupData.password}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="password" className='font-semibold text-gray-700'>Re-Enter Password</label>
                        <input
                            type="password"
                            required
                            name="re_enterPassword"
                            id="password"
                            placeholder="Enter your password Again..."
                            className="bg-gray-100 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleUserInput}
                            value={signupData.re_enterPassword}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="phoneNumber" className='font-semibold text-gray-700'>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Enter your phone number..."
                            className="bg-gray-100 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleUserInput}
                            value={signupData.phoneNumber}
                        />
                    </div>

                    <button type="submit" className='mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-300'>
                        Create Account
                    </button>

                    <div className="text-center mt-4">
                        <p>Already have an account? <Link to="/login" className='text-blue-600 hover:underline'>Login</Link></p>
                        <p>Continue without signup? <Link to="/" className='text-blue-600 hover:underline'>Homepage</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
