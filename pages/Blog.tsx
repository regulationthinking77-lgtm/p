
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, MessageSquare, Heart } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const Blog: React.FC = () => {
  return (
    <div className="pt-40 pb-24 bg-[#131619] min-h-screen">
      <div className="container mx-auto px-4 md:px-16">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-2xl">
            <span className="text-orange-500 font-black uppercase tracking-[0.2em] text-sm mb-4 block">Our Journal</span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Knowledge Hub</h1>
            <p className="text-slate-400 text-xl font-medium">Insights, tutorials, and success stories from the forefront of digital education.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center space-x-6">
            <div className="text-right">
              <div className="text-white font-black">50K+</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Subscribers</div>
            </div>
            <button className="bg-white text-black px-6 py-3 rounded-2xl font-black text-sm hover:scale-105 transition-all">Join Them</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {BLOG_POSTS.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="group cursor-pointer bg-[#1a1d21] rounded-[48px] overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all flex flex-col md:flex-row h-full"
            >
              <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                />
              </div>
              <div className="md:w-1/2 p-10 flex flex-col">
                <div className="flex items-center space-x-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-500 font-medium mb-8 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                   <div className="flex items-center space-x-2 text-slate-400">
                     <User className="w-4 h-4" />
                     <span className="text-xs font-bold">{post.author}</span>
                   </div>
                   <div className="flex items-center space-x-4">
                     <button className="text-slate-500 hover:text-red-500 transition-colors"><Heart className="w-4 h-4" /></button>
                     <button className="text-slate-500 hover:text-blue-500 transition-colors"><MessageSquare className="w-4 h-4" /></button>
                     <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-2 transition-transform" />
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
