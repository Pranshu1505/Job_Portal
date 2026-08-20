import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setUser, setTokenExpiresAt } from '@/redux/authSlice'
import { useNavigate, useLocation } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { Button } from '../ui/button'

const GoogleAuthButton = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [pendingCredential, setPendingCredential] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

    const completeGoogleAuth = async (credential, roleToSend) => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/google-auth`, {
                credential,
                role: roleToSend
            }, {
                headers:{ 'Content-Type':'application/json' },
                withCredentials:true
            });

            if(res.data.success){
                dispatch(setUser(res.data.user));
                dispatch(setTokenExpiresAt(res.data.tokenExpiresAt));
                toast.success(res.data.message);
                const redirectTo = location.state?.from || "/";
                navigate(redirectTo);
                setPendingCredential(null);
            } else if(res.data.needsRole){
                setPendingCredential(credential);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Google login failed");
        }
    }

    const handleGoogleSuccess = async (credentialResponse) => {
        await completeGoogleAuth(credentialResponse.credential, role || undefined);
    }

    const confirmRoleHandler = async () => {
        if(!selectedRole){
            toast.error("Please select a role");
            return;
        }
        await completeGoogleAuth(pendingCredential, selectedRole);
    }

    if(pendingCredential){
        return (
            <div className='my-4 p-4 border rounded-md text-center'>
                <p className='text-sm mb-3'>New account detected. Please select your role to continue:</p>
                <div className='flex justify-center gap-4 mb-3'>
                    <Button
                        type="button"
                        variant={selectedRole === 'student' ? 'default' : 'outline'}
                        onClick={() => setSelectedRole('student')}
                    >
                        Student
                    </Button>
                    <Button
                        type="button"
                        variant={selectedRole === 'recruiter' ? 'default' : 'outline'}
                        onClick={() => setSelectedRole('recruiter')}
                    >
                        Recruiter
                    </Button>
                </div>
                <Button type="button" onClick={confirmRoleHandler} className="w-full">
                    Continue
                </Button>
            </div>
        )
    }

    return (
        <div className='my-4 flex justify-center'>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google login failed")}
            />
        </div>
    )
}

export default GoogleAuthButton


