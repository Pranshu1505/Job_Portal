import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector } from 'react-redux'
import useGetSavedJobs from '@/hooks/useGetSavedJobs'

const SavedJobs = () => {
    useGetSavedJobs();
    const { savedJobs } = useSelector(store => store.job);

    return (
        <div>
            <Navbar/>
            <div className='max-w-7xl mx-auto mt-5'>
                <h1 className='font-bold text-xl my-5'>Saved Jobs ({savedJobs?.length || 0})</h1>
                {
                    savedJobs?.length <= 0 ? (
                        <span>No saved jobs yet</span>
                    ) : (
                        <div className='grid grid-cols-3 gap-4 pb-10'>
                            {
                                savedJobs?.map((job) => (
                                    <div key={job?._id}>
                                        <Job job={job}/>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SavedJobs