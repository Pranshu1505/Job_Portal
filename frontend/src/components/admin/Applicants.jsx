import React from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal, ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import useGetApplicants from '@/hooks/useGetApplicants'

const shortlistingStatus = ["Accepted", "Rejected"];

const Applicants = () => {
    const params = useParams();
    const navigate = useNavigate();
    useGetApplicants(params.id);

    const { allApplicants } = useSelector(store => store.application);

    const statusHandler = async (status, applicationId) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${applicationId}/update`, { status }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                window.location.reload(); // simple refresh to reflect updated status
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <Button onClick={() => navigate("/admin/jobs")} variant='outline' className="flex items-center gap-2 text-gray-500 font-semibold mb-5">
                    <ArrowLeft />
                    <span>Back</span>
                </Button>
                <h1 className='font-bold text-xl mb-5'>
                    Applicants ({allApplicants?.applications?.length || 0})
                </h1>
                <Table>
                    <TableCaption>A list of applicants for this job</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            allApplicants?.applications?.length <= 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center">
                                        No applicants yet
                                    </TableCell>
                                </TableRow>
                            ) : (
                                allApplicants?.applications?.map((application) => (
                                    <TableRow key={application._id}>
                                        <TableCell>{application?.applicant?.fullname}</TableCell>
                                        <TableCell>{application?.applicant?.email}</TableCell>
                                        <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                                        <TableCell>
                                            {
                                                application?.applicant?.profile?.resume ? (
                                                    <a target='_blank' href={application?.applicant?.profile?.resume} className='text-blue-500 hover:underline'>
                                                        {application?.applicant?.profile?.resumeOriginalName || "View Resume"}
                                                    </a>
                                                ) : <span>NA</span>
                                            }
                                        </TableCell>
                                        <TableCell>{application?.createdAt?.split("T")[0]}</TableCell>
                                        <TableCell className="capitalize">{application?.status}</TableCell>
                                        <TableCell className="text-right cursor-pointer">
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    {
                                                        shortlistingStatus.map((status, index) => (
                                                            <div
                                                                key={index}
                                                                onClick={() => statusHandler(status, application._id)}
                                                                className='flex w-fit items-center my-1 gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded'
                                                            >
                                                                <span>{status}</span>
                                                            </div>
                                                        ))
                                                    }
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Applicants