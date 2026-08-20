import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { setSavedJobs } from '@/redux/jobSlice'

const Job = ({job}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { savedJobs } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);

  const isSaved = savedJobs?.some(saved => saved?._id === job?._id);
  const [saving, setSaving] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt =new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffrence = currentTime - createdAt;
    return Math.floor(timeDiffrence/(1000*24*60*60));
  }

  const saveForLaterHandler = async (e) => {
    e.stopPropagation();
    if(!user){
        toast.error("Please login to save jobs");
        return;
    }
    try {
        setSaving(true);
        const res = await axios.post(`${USER_API_END_POINT}/savedjobs/${job._id}`, {}, { withCredentials: true });
        if(res.data.success){
            toast.success(res.data.message);
            if(res.data.saved){
                dispatch(setSavedJobs([...savedJobs, job]));
            } else {
                dispatch(setSavedJobs(savedJobs.filter(saved => saved?._id !== job?._id)));
            }
        }
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
        setSaving(false);
    }
  }

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>
                {job?.createdAt
                ? daysAgoFunction(job.createdAt) === 0
                ? "Today"
                : `${daysAgoFunction(job.createdAt)} days ago`
                : "Recently"}
            </p>
            <Button onClick={saveForLaterHandler} disabled={saving} variant='outline' className="rounded-full">
                {isSaved ? <BookmarkCheck className='text-[#7209b7]'/> : <Bookmark/>}
            </Button>
        </div>
        <div className='flex items-center gap-2 my-2'>
            <Button>
                <Avatar>
                    <AvatarImage src={job?.company?.logo || "https://dcassetcdn.com/design_img/2466486/616548/616548_12965492_2466486_7e7e3490_image.jpg"}/>
                </Avatar>
            </Button>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.descriptions?.[0]}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
        </div>
        <div className='flex items-center gap-4 mt-4'>
            <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline'>Details</Button>
            <Button onClick={saveForLaterHandler} disabled={saving} variant='outline' className="bg-[#7209b7] text-white">
                {isSaved ? "Saved" : "Save For Later"}
            </Button>
        </div>
    </div>
  )
}

export default Job

