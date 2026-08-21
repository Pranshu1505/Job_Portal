import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetJobById from '@/hooks/useGetJobById'

const JobSetup = () => {
    const params = useParams();
    useGetJobById(params.id);

    const [input, setInput] = useState({
        title:"",
        description:"",
        requirements:"",
        salary:"",
        location:"",
        jobType:"",
        experience:"",
        position:0
    });

    const { singleJob } = useSelector(store => store.job);
    const [loading, setLoding] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoding(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoding(false);
        }
    }

    useEffect(() => {
        setInput({
            title: singleJob?.title || "",
            description: singleJob?.descriptions || "",
            requirements: singleJob?.requirements?.join(",") || "",
            salary: singleJob?.salary || "",
            location: singleJob?.location || "",
            jobType: singleJob?.jobType || "",
            experience: singleJob?.experience || "",
            position: singleJob?.position || 0
        })
    }, [singleJob]);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto my-10 px-4'>
                <form onSubmit={submitHandler} className='p-8 shadow-lg rounded-md'>
                    <div className='flex items-center gap-5 mb-6'>
                        <Button onClick={() => navigate("/admin/jobs")} variant='outline' className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Job Setup</h1>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <Label>Title</Label>
                            <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="my-1" />
                        </div>
                        <div>
                            <Label>Descriptions</Label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="my-1" />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="my-1" />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} className="my-1" />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="my-1" />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className="my-1" />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} className="my-1" />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="my-1" />
                        </div>
                    </div>

                    {
                        loading ? (
                            <Button className="w-full my-6"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button>
                        ) : (
                            <Button type="submit" className="w-full my-6">Update</Button>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default JobSetup