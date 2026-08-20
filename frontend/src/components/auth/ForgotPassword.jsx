import React, { useState } from 'react'
import Navbar from '../shared/Navbar.jsx'
import { Label } from '../ui/label.jsx'
import { Input } from '../ui/input.jsx'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { Loader2 } from 'lucide-react'

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/forgot-password`, { email }, {
                headers: { "Content-Type": "application/json" }
            });
            if(res.data.success){
                toast.success(res.data.message);
                setSent(true);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar/>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-2'>Forgot Password</h1>
                    <p className='text-sm text-gray-500 mb-5'>Enter your email and we'll send you a reset link.</p>

                    {
                        sent ? (
                            <div className='text-center py-6'>
                                <p className='text-green-600 font-medium'>Check your inbox!</p>
                                <p className='text-sm text-gray-500 mt-2'>If an account exists with this email, a reset link has been sent.</p>
                            </div>
                        ) : (
                            <>
                                <div className='my-2'>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="pranshu@gmail.com"
                                    />
                                </div>
                                {
                                    loading ? (
                                        <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</Button>
                                    ) : (
                                        <Button type="submit" className="w-full my-4">Send Reset Link</Button>
                                    )
                                }
                            </>
                        )
                    }

                    <span className='text-sm'>Remembered your password? <Link to="/login" className="text-blue-600">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword