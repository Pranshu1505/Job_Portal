import React, { useState } from 'react'
import Navbar from '../shared/Navbar.jsx'
import { Label } from '../ui/label.jsx'
import { Input } from '../ui/input.jsx'
import { Button } from '../ui/button'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { Loader2 } from 'lucide-react'

function VerifyOtp() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const verifyHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/verify-otp`, { email, otp }, {
                headers: { "Content-Type": "application/json" }
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const resendHandler = async () => {
        try {
            setResending(true);
            const res = await axios.post(`${USER_API_END_POINT}/resend-otp`, { email }, {
                headers: { "Content-Type": "application/json" }
            });
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setResending(false);
        }
    }

    if(!email){
        return (
            <div>
                <Navbar/>
                <div className='text-center my-20'>
                    <p className='text-gray-500'>No email found. Please sign up again.</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={verifyHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-2'>Verify your email</h1>
                    <p className='text-sm text-gray-500 mb-5'>We've sent a 6-digit code to <span className='font-medium'>{email}</span></p>

                    <div className='my-2'>
                        <Label>Enter OTP</Label>
                        <Input
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            placeholder="123456"
                            className='tracking-widest text-center text-lg'
                        />
                    </div>

                    {
                        loading ? (
                            <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">Verify</Button>
                        )
                    }

                    <div className='text-center'>
                        <button
                            type="button"
                            onClick={resendHandler}
                            disabled={resending}
                            className='text-sm text-blue-600 hover:underline disabled:text-gray-400'
                        >
                            {resending ? "Sending..." : "Resend OTP"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VerifyOtp