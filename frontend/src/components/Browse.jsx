import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search, ArrowLeft } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

function Browse() {
  useGetAllJobs();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allJobs, searchedQuery } = useSelector(store => store.job);

  const [localQuery, setLocalQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [displayJobs, setDisplayJobs] = useState([]);

  const searchHandler = () => {
    dispatch(setSearchedQuery(localQuery));
  }

  useEffect(() => {
    let jobs = [...allJobs];

    if(searchedQuery){
        jobs = jobs.filter((job) =>
            job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job?.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job?.company?.name?.toLowerCase().includes(searchedQuery.toLowerCase())
        );
    }

    if(sortBy === 'salary-high'){
        jobs.sort((a,b) => (Number(b.salary)||0) - (Number(a.salary)||0));
    } else if(sortBy === 'salary-low'){
        jobs.sort((a,b) => (Number(a.salary)||0) - (Number(b.salary)||0));
    } else {
        jobs.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setDisplayJobs(jobs);
  }, [allJobs, searchedQuery, sortBy]);

  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10 px-4'>
        <Button onClick={() => navigate("/")} variant='outline' className="flex items-center gap-2 text-gray-500 font-semibold mb-5">
            <ArrowLeft/>
            <span>Back</span>
        </Button>

        <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 my-5'>
            <Input
                placeholder="Search by job title, company, or location"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') searchHandler(); }}
                className="w-full sm:max-w-md"
            />
            <Button onClick={searchHandler} className="bg-[#6A38C2] hover:bg-[#5b2fa8]">
                <Search className='h-4 w-4'/>
            </Button>

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='sm:ml-auto border rounded-md px-3 py-2 text-sm'
            >
                <option value="newest">Newest First</option>
                <option value="salary-high">Salary: High to Low</option>
                <option value="salary-low">Salary: Low to High</option>
            </select>
        </div>

        <h1 className='font-bold text-xl my-5'>Search Results ({displayJobs.length})</h1>

        {
            displayJobs.length <= 0 ? (
                <div className='text-center text-gray-500 my-20'>
                    <p className='text-lg'>No jobs found</p>
                    <p className='text-sm'>Try a different search term or clear your filters</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10'>
                    {
                        displayJobs.map((job) => (
                            <Job key={job?._id} job={job}/>
                        ))
                    }
                </div>
            )
        }
      </div>
    </div>
  )
}

export default Browse