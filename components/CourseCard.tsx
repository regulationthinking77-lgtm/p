import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white/5 rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 border border-white/5 group hover:border-orange-500/20 flex flex-col h-full hover:-translate-y-2">
      <div className="relative h-60 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-5 left-5 bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
          {course.category}
        </div>
      </div>
      
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex items-center space-x-2 mb-4">
          <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
          <span className="text-sm font-bold text-slate-200">{course.rating}</span>
          <span className="text-sm text-slate-500 font-medium">({course.students}+ Students)</span>
        </div>

        <h3 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-orange-500 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-slate-500 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">
          {course.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
          <div className="text-3xl font-black text-white tracking-tighter">
            ${course.price}
          </div>
          <Link 
            to={`/course/${course.id}`}
            className="flex items-center space-x-2 text-orange-500 font-bold hover:text-orange-400 transition-colors group/link"
          >
            <span className="uppercase text-[11px] tracking-widest">Enrol Now</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;