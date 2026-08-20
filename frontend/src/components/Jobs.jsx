import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const Jobs = () => {
    const navigate = useNavigate();
    useGetAllJobs();
    const {allJobs, searchedQuery} = useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
     
    useEffect(() => {
        console.log("useEffect running, searchedQuery:", searchedQuery, "allJobs count:", allJobs.length);
        if(searchedQuery){
            const filteredJobs = allJobs.filter((job) => {
                const salaryNum = Number(job?.salary) || 0;

                // Salary range check
                let salaryMatch = false;
                switch(searchedQuery){
                    case "0-40k":
                        salaryMatch = salaryNum <= 40000;
                        break;
                    case "42-1LPA":
                        salaryMatch = salaryNum > 40000 && salaryNum <= 100000;
                        break;
                    case "1LPA to 5LPA":
                        salaryMatch = salaryNum > 100000 && salaryNum <= 500000;
                        break;
                    case "6LPA to 12LPA":
                        salaryMatch = salaryNum > 500000 && salaryNum <= 1200000;
                        break;
                    case "14LPA to 24LPA":
                        salaryMatch = salaryNum > 1200000 && salaryNum <= 2400000;
                        break;
                    default:
                        salaryMatch = false;
                }

                const textMatch = job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                                 job?.location?.toLowerCase().includes(searchedQuery.toLowerCase());

                return textMatch || salaryMatch;
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
     }
    }, [allJobs, searchedQuery]);
    // useEffect(() => {
    //     if(searchedQuery){
    //         const filteredJobs = allJobs.filter((job) => {
    //             return job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
    //                    job?.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
    //                    job?.salary?.toString().toLowerCase().includes(searchedQuery.toLowerCase())
    //         });
    //         setFilterJobs(filteredJobs);
    //     } else {
    //         setFilterJobs(allJobs);
    //     }
    // }, [allJobs, searchedQuery]);

  return (
    <div>
        <Navbar/>
          <Button onClick={() => navigate("/")} variant='outline' className="flex items-center gap-2 text-gray-500 font-semibold mb-6 mt-2">
            <ArrowLeft/>
            <span>Back</span>
        </Button>

        <div className='max-w-7xl mx-auto mt-5'>
            <div className='flex gap-5'>
                <div className='w-20%'>
                    <FilterCard key={searchedQuery}/>
                </div>
                {
                    filterJobs.length <= 0 ? <span>Job not found</span>:(
                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid grid-cols-3 gap-4'>
                                {
                                    filterJobs.map((job) => (
                                        <div key={job?._id}>
                                            <Job job={job}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Jobs