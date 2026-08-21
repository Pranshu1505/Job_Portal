import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { Loader2 } from 'lucide-react'

const UpdateProfileDialog = ({open, setOpen}) => {
  const [loading, setLoding] = useState(false);
  const {user} = useSelector(store=>store.auth);
  const isRecruiter = user?.role === 'recruiter';  

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    profilePhoto: null,
    resume: null
  });
  
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value});
  }

  const photoChangeHandler = (e) => {
    setInput({...input, profilePhoto: e.target.files?.[0]})
  }

  const fileChangeHandler = (e)=> {
    setInput({...input, resume: e.target.files?.[0]})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if(input.profilePhoto){
        formData.append("profilePhoto", input.profilePhoto);
    }
    if(input.resume){
        formData.append("resume", input.resume);
    }

    try {
        setLoding(true);
        const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
            headers:{
                'Content-Type':'multipart/form-data'
            },
            withCredentials:true
        });
        if(res.data.success){
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message); 
    } finally {
        setLoding(false);
    }
    setOpen(false);
  }

  return (
    <div>
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto" onInteractOutside={ () => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <DialogDescription>
                        Update your profile information here.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" name="fullname" type="text" value={input.fullname || ""} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                    </div>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" type="email" value={input.email || ""} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                    </div>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                            <Label htmlFor="number" className="text-right">Number</Label>
                            <Input id="number" name="phoneNumber" value={input.phoneNumber || ""} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                    </div>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input id="bio" name="bio" value={input.bio || ""} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                    </div>
                    {/* <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input id="skills" name="skills" value={input.skills || ""} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                    </div> */}
                    {
                        !isRecruiter && (
                            <>
                                <div className='grid gap-4 py-4'>
                                    <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                        <Label htmlFor="skills" className="text-right">Skills</Label>
                                        <Input id="skills" name="skills" value={input.skills || ""} onChange={changeEventHandler} className="col-span-3" />
                                    </div>
                                </div>
                                <div className='grid gap-4 py-4'>
                                    <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                        <Label htmlFor="file" className="text-right">Resume</Label>
                                        <Input id="file" name="file" type="file" accept="application/pdf" onChange={fileChangeHandler} className="col-span-3" />
                                    </div>
                                </div>
                            </>
                        )
                    }                    
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                            <Label htmlFor="profilePhoto" className="text-right">Photo</Label>
                            <Input id="profilePhoto" name="profilePhoto" type="file" accept="image/*" onChange={photoChangeHandler} className="col-span-3" />
                        </div>
                    </div>
                    {/* <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="file" className="text-right">Resume</Label>
                            <Input id="file" name="file" type="file" accept="application/pdf" onChange={fileChangeHandler} className="col-span-3" />
                        </div>
                    </div> */}
                    <DialogFooter>
                        {
                            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</Button> : <Button type="submit" className="w-full color-black my-1">Update</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default UpdateProfileDialog

