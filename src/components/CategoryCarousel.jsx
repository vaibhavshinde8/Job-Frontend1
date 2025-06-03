import React, { useEffect, useRef, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import {
  Code,
  Database,
  Palette,
  Layout,
  Layers
} from 'lucide-react';

const categories = [
  { label: 'Frontend Developer', icon: <Layout size={18} /> },
  { label: 'Backend Developer', icon: <Database size={18} /> },
  { label: 'Data Science', icon: <Layers size={18} /> },
  { label: 'Graphic Designer', icon: <Palette size={18} /> },
  { label: 'FullStack Developer', icon: <Code size={18} /> },
  { label: 'UI/UX Designer', icon: <Palette size={18} /> },
  { label: 'DevOps Engineer', icon: <Database size={18} /> }
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        let newScrollX = scrollX + direction * 1;
        if (newScrollX >= maxScrollLeft) {
          setDirection(-1); // change direction to left
          newScrollX = maxScrollLeft;
        } else if (newScrollX <= 0) {
          setDirection(1); // change direction to right
          newScrollX = 0;
        }

        container.scrollTo({
          left: newScrollX,
          behavior: 'smooth'
        });
        setScrollX(newScrollX);
      }
    }, 30); // adjust for speed

    return () => clearInterval(interval);
  }, [scrollX, direction]);

  return (
    <section className="py-20 ">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Job Categories</h2>
        <p className="text-gray-600 max-w-xl mx-auto">Browse trending job roles to kickstart your next opportunity</p>
      </div>

      <div className="w-full max-w-6xl mx-auto overflow-hidden px-4">
        {/* Apply `overflow-x-hidden` to the container */}
        <div ref={carouselRef} className="flex gap-6 overflow-x-hidden no-scrollbar scroll-smooth">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="min-w-[200px] flex-shrink-0"
            >
              <Button
                onClick={() => searchJobHandler(cat.label)}
                variant="outline"
                className="rounded-xl px-6 py-4 w-full flex items-center justify-center gap-2 transition-all hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] shadow-sm hover:shadow-md duration-300"
              >
                {cat.icon}
                {cat.label}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
