import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/image-bg.jpg';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
//         <div className='relative text-center min-h-screen bg-cover bg-center bg-no-repeat'
//             style={{ backgroundImage: `url(${heroImg})` }} 
//             >
//                 {/* Dark overlay */}
//             <div className="absolute inset-0 bg-black/50"></div>
//             <div className='flex flex-col gap-5 my-10'>
//                 <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
//                 <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
//                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
//                 <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
//                     <input
//                         type="text"
//                         placeholder='Find your dream jobs'
//                         onChange={(e) => setQuery(e.target.value)}
//                         className='outline-none border-none w-full'

//                     />
//                     <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
//                         <Search className='h-5 w-5' />
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HeroSection


<div
    className="relative text-center min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${heroImg})` }}
>
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/65"></div>

    {/* Content */}
    <div className="relative z-10 flex flex-col gap-5 pt-28 text-white">
        <span className="mx-auto px-4 py-2 rounded-full bg-white/20 text-[#F83002] font-medium backdrop-blur-sm">
            No. 1 Job Hunt Website
        </span>

        <h1 className="text-6xl font-extrabold leading-tight text-white">
            Search, Apply & <br />
            Get Your <span className="text-[#A78BFA]">Dream Jobs</span>
        </h1>

        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Find top opportunities from leading companies and apply instantly.
        </p>

        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-white">
            <input
                type="text"
                placeholder="Find your dream jobs"
                onChange={(e) => setQuery(e.target.value)}
                className="outline-none border-none w-full text-black"
            />

            <Button
                onClick={searchJobHandler}
                className="rounded-r-full bg-[#6A38C2]"
            >
                <Search className="h-5 w-5" />
            </Button>
        </div>
    </div>
</div>
);
};
export default HeroSection;