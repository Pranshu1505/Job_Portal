import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType:"Location",
        array:["Delhi NCR", "Bengaluru", "Hyderabad", "Pune", "Mumbai","Chandigarh", "Ayodhya", "Noida", "Lucknow", "kernatak", "Chennai"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Analyst", "Game Development", "QA Engineer", "DevOps Engineer", "AI/ML Engineer", "Mobile App Developer", "MERN Stack Developer", "Python Developer"]
    },
    {
        filterType:"Salary",
        array:["0-40k", "42-1LPA", "1LPA to 5LPA", "6LPA to 12LPA", "14LPA to 24LPA"]
    }
]

function FilterCard() {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    // console.log("Selected:", value); 
    setSelectedValue(value);
    dispatch(setSearchedQuery(value)); 
  }

//   useEffect(() => {
//     dispatch(setSearchedQuery(selectedValue));
//   }, [selectedValue]);

  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3' />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
                filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item, idx) => {
                                const itemId = `id-${index}-${idx}`;
                                return (                                    
                                    <div key={itemId} className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item} id={itemId}/>
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterCard