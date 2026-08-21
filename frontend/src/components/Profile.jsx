import React, { useState } from 'react'
import profileImg from "./images/image.jpeg";
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button';
import { ArrowLeft, Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'

function Profile() { 
  const navigate = useNavigate(); 
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const [switching, setSwitching] = useState(false);
  const isRecruiter = user?.role === 'recruiter';
  const isResume = user?.profile?.resume ? true : false;


  const switchRoleHandler = async () => {
        const newRole = user?.role === 'student' ? 'recruiter' : 'student';
        const confirmed = window.confirm(`Are you sure you want to switch to ${newRole}? This will change what you can access on the platform.`);
        if(!confirmed) return;

        try {
            setSwitching(true);
            const res = await axios.post(`${USER_API_END_POINT}/switch-role`, {}, { withCredentials: true });
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate(newRole === 'recruiter' ? "/admin/home" : "/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setSwitching(false);
        }
    }

  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-4xl my-5 pt-8'>
            
                <Button onClick={() => navigate("/")} variant='outline' className="flex items-center gap-2 text-gray-500 font-semibold">
                    <ArrowLeft/>
                    <span>Back</span>
                </Button>
         <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-4xl my-5 pt-8 px-4 sm:px-0'>
            <div className='flex flex-col sm:flex-row sm:justify-between gap-4'>
                <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left'>
                    <Avatar className="h-20 w-20 sm:h-24 sm:w-24 sm:my-10 sm:ml-4">
                        <AvatarImage src={user?.profile?.profilePhoto || profileImg} alt="profile"/>
                    </Avatar>
                    <div>
                        <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                        <p>{user?.profile?.bio}</p>
                    </div>
                </div>
                <Button onClick={() => setOpen(true)} className="text-right mr-3" variant="outline"><Pen/></Button>
            </div>
         </div>
            <div className='my-5'>
                <div className='flex items-center gap-3 my-5 ml-3'>
                    <Mail/>
                    <span>{user?.email}</span>
                </div>
                <div className='flex items-center gap-3 my-5 ml-3'>
                    <Contact/>
                    <span>{user?.phoneNumber}</span>
                </div>
            </div>
            <div className='my-5'>
                <Button
                    onClick={switchRoleHandler}
                    disabled={switching}
                    variant='outline'
                    className='flex items-center gap-2 ml-3'
                >
                    <RefreshCw className={`w-4 h-4 ${switching ? 'animate-spin' : ''}`}/>
                    <span>Switch to {user?.role === 'student' ? 'Recruiter' : 'Student'}</span>
                </Button>
            </div>

            {
                !isRecruiter && (
                    <>
                        <div className='my-5'>
                            <h1 className='flex ml-3 font-bold'>Skills</h1>
                            <div className='flex items-center gap-1 ml-3 '>
                                {
                                    user?.profile?.skills?.length ? user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                                }
                            </div>
                        </div>
                        <div className='grid w-full max-w-sm items-center gap-1'>
                            <Label className="text-md font-bold ml-3">Resume</Label>
                            <div className='my-4'>
                                {
                                    isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursure-pointer ml-4 my-3'>{user?.profile?.resumeOriginalName}</a> : <span className='ml-3'>NA</span>
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </div>

        {
            !isRecruiter && (
                <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                    <AppliedJobTable/>
                </div>
            )
        }

        <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile

