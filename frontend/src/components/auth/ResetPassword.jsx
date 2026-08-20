import React, { useState } from 'react'
import Navbar from '../shared/Navbar.jsx'
import { Label } from '../ui/label.jsx'
import { Input } from '../ui/input.jsx'
import { Button } from '../ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { Loader2 } from 'lucide-react'

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        if(password.length < 6){
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/reset-password/${token}`, { password }, {
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

    return (
        <div>
            <Navbar/>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Reset Password</h1>

                    <div className='my-2'>
                        <Label>New Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Confirm Password</Label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                        />
                    </div>

                    {
                        loading ? (
                            <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">Reset Password</Button>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default ResetPassword