import React from 'react'
import Navbar from '../shared/Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminHome = () => {
    useGetAllCompanies();
    useGetAllAdminJobs();

    const { companies } = useSelector(store => store.company);
    const { allAdminJobs } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const recentCompanies = companies?.slice(0, 5);
    const recentJobs = allAdminJobs?.slice(0, 5);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <h1 className='font-bold text-2xl mb-1'>Welcome back, {user?.fullname} 👋</h1>
                <p className='text-gray-500 mb-8'>Here's what's happening with your recruitment</p>

                <div className='grid grid-cols-2 gap-4 mb-10'>
                    <div className='border rounded-lg p-6'>
                        <p className='text-gray-500 text-sm'>Total Companies</p>
                        <h2 className='text-3xl font-bold'>{companies?.length || 0}</h2>
                    </div>
                    <div className='border rounded-lg p-6'>
                        <p className='text-gray-500 text-sm'>Total Jobs Posted</p>
                        <h2 className='text-3xl font-bold'>{allAdminJobs?.length || 0}</h2>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-8'>
                    {/* Recent Companies */}
                    <div>
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='font-bold text-lg'>Recent Companies</h2>
                            <Button variant='link' onClick={() => navigate("/admin/companies")}>View all</Button>
                        </div>
                        <div className='flex flex-col gap-3'>
                            {
                                recentCompanies?.length <= 0 ? (
                                    <p className='text-gray-500 text-sm'>No companies added yet</p>
                                ) : (
                                    recentCompanies?.map((company) => (
                                        <div
                                            key={company._id}
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className='flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50'
                                        >
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={company.logo} />
                                            </Avatar>
                                            <div>
                                                <p className='font-medium'>{company.name}</p>
                                                <p className='text-xs text-gray-500'>{company.createdAt?.split("T")[0]}</p>
                                            </div>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>

                    {/* Recent Jobs */}
                    <div>
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='font-bold text-lg'>Recent Jobs</h2>
                            <Button variant='link' onClick={() => navigate("/admin/jobs")}>View all</Button>
                        </div>
                        <div className='flex flex-col gap-3'>
                            {
                                recentJobs?.length <= 0 ? (
                                    <p className='text-gray-500 text-sm'>No jobs posted yet</p>
                                ) : (
                                    recentJobs?.map((job) => (
                                        <div
                                            key={job._id}
                                            onClick={() => navigate(`/admin/jobs/${job._id}`)}
                                            className='border rounded-lg p-3 cursor-pointer hover:bg-gray-50'
                                        >
                                            <p className='font-medium'>{job.title}</p>
                                            <p className='text-xs text-gray-500'>{job?.company?.name} • {job.createdAt?.split("T")[0]}</p>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome