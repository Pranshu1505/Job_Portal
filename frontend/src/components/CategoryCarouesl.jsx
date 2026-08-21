import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
    "web Developer"
]

function CategoryCarouesl() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (cat) => {
    dispatch(setSearchedQuery(cat));
    navigate("/jobs");
  }

  return (
    <div>
        <Carousel className="w-full max-w-xs md:max-w-xl mx-auto my-8 md:my-15 px-8">
            <CarouselContent>
                {
                    category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/2 lg:basis-1/3"
                        >
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="rounded-full bg-gray-100 hover:bg-[#2A38B0]"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))
                }
           </CarouselContent>
           <CarouselPrevious/>
           <CarouselNext/>
        </Carousel>
    </div>
  )
}

export default CategoryCarouesl



