import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import AdminJobsTable from './AdminJobsTable' // isko bhi banana padega, CompaniesTable jaisa
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const navigate = useNavigate();
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <Button onClick={() => navigate("/admin/home")} variant='outline' className="flex items-center gap-2 text-gray-500 font-semibold">
                        <ArrowLeft/>
                        <span>Back</span>
                    </Button>
            <div className='flex items-center justify-between my-5'>
                <Input
                    className="w-fit"
                    placeholder="Filter by name"
                />
                <Button onClick={() => navigate("/admin/jobs/create")}>New Job</Button>
            </div>
            <AdminJobsTable/>
        </div>
    </div>
  )
}

export default AdminJobs