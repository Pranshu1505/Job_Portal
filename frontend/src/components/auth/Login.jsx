import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar.jsx'
import { Label } from '../ui/label.jsx'
import { Input } from '../ui/input.jsx'
import { Button } from '../ui/button'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser, setTokenExpiresAt } from '@/redux/authSlice.js'
import { Loader2 } from 'lucide-react'
import GoogleAuthButton from './GoogleAuthButton.jsx'

function Login() {
    const [input, setInput] = useState({
            email:"",
            password:"",
    });

    const changeEventHandler = (e) =>{
        setInput({...input, [e.target.name]:e.target.value});
    }
    
    const {loading} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch(setLoading(false));
    }, []);

    const submitHandler = async (e) =>{
        try {
            e.preventDefault();
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true,
            });
            if(res.data.success){
                dispatch(setUser(res.data.user));
                dispatch(setTokenExpiresAt(res.data.tokenExpiresAt));
                toast.success(res.data.message);
                const redirectTo = location.state?.from || "/";
                navigate(redirectTo);
            }
        } catch (error) {
            console.log(error.response);
            if(error?.response?.data?.needsVerification){
                toast.error(error.response.data.message);
                navigate("/verify-otp", { state: { email: error.response.data.email } });
                } else {
                toast.error(error?.response?.data?.message || error.message);
            }
        }finally{
            dispatch(setLoading(false));
        }
    }

  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>Login</h1>
                <div className='my-2' >
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={input.email}
                        name="email"
                        onChange={changeEventHandler}
                        placeholder="pranshu@gmail.com"
                    />
                </div>
                <div className='my-2' >
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={input.password}
                        name="password"
                        onChange={changeEventHandler}
                        placeholder="123456"
                    />
                    <div className='text-right mt-1'>
                        <Link to="/forgot-password" className='text-sm text-blue-600 hover:underline'>Forgot Password?</Link>
                    </div>
                </div>
                {
                    loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</Button> : <Button type="submit" className="w-full color-black my-1">Login</Button>
                }
                <div className='flex items-center gap-3 my-4'>
                    <hr className='flex-1'/>
                    <span className='text-sm text-gray-500'>OR</span>
                    <hr className='flex-1'/>
                </div>

                <GoogleAuthButton />

                <span className='text-sm'>Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link></span>
            </form>
        </div>
    </div>
  )
}
export default Login