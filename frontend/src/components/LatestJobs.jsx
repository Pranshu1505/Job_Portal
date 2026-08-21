import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
// import store from '@/redux/store';

// const randomJobs = [1,2,3,4,5,6,7,8];
function LatestJobs() {
    const allJobs = useSelector(store=>store.job?.allJobs || []);
  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
        <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latests & Top </span>Job Openings</h1>
        {/* // cards */}
        {/* <div className='grid grid-cols-3 gap-4 my-5'>
            {
               randomJobs.slice(0,6).map((item, index) => <LatestJobCards/> )
            }
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5 px-4">
            {
                allJobs.length <= 0 ? <span>No Job Available</span>: allJobs?.slice(0, 6).map((job) => (
                    <LatestJobCards key={job._id} job={job} />
                ))
            }
        </div>
    </div>
  )
}

export default LatestJobs