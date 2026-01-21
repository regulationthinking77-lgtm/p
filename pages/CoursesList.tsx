
import React, { useState } from 'react';
import CourseCard from '../components/CourseCard';
import { Course } from '../types';
import { Search, Filter } from 'lucide-react';

interface CoursesListProps {
  courses: Course[];
}

const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', ...new Set(courses.map(c => c.category))];

  const filteredCourses = courses.filter(c => 
    (filter === 'All' || c.category === filter) &&
    (c.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-40 pb-24 bg-[#131619] min-h-screen">
      <div className="container mx-auto px-4 md:px-16">
        <div className="mb-20 space-y-12">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Explore Courses</h1>
            <p className="text-slate-500 text-xl font-medium">Discover top-rated courses to advance your career and skills.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-grow w-full lg:w-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search for courses..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1a1d21] border border-white/5 rounded-3xl py-5 pl-16 pr-6 text-white focus:ring-2 focus:ring-orange-500/50 outline-none transition-all"
              />
            </div>

            <div className="flex items-center space-x-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-6 py-4 rounded-3xl text-slate-400">
                <Filter className="w-5 h-5" />
                <span className="font-bold whitespace-nowrap">Filter By:</span>
              </div>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-4 rounded-3xl font-bold whitespace-nowrap transition-all ${filter === cat ? 'orange-gradient text-white' : 'bg-[#1a1d21] text-slate-400 hover:bg-white/5'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
          {filteredCourses.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <h3 className="text-2xl font-black text-slate-700">No courses found matching your criteria.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
