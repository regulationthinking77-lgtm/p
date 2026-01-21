
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, ArrowLeft, Share2, Heart, MessageSquare } from 'lucide-react';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="pt-48 pb-24 bg-[#0f1113] min-h-screen text-center">
        <h2 className="text-3xl font-black text-white">Post not found</h2>
        <Link to="/" className="text-orange-500 mt-4 inline-block font-bold underline">Back Home</Link>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-32 bg-[#0f1113] min-h-screen">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center space-x-2 text-slate-500 hover:text-white transition-colors mb-12 font-bold group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {post.category}
              </span>
              <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>{post.date}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-black text-white text-lg">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Author</div>
                <div className="text-white font-bold">{post.author}</div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="w-full aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
            <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-xl leading-relaxed font-medium mb-10">
              {post.excerpt}
            </p>
            <div className="text-slate-400 text-lg leading-relaxed space-y-8 font-medium">
              {post.content}
              <p>
                As we continue to observe the rapid integration of these tools, one thing remains certain: the human element in creativity—the ability to tell stories, feel empathy, and solve complex human problems—remains irreplaceable. AI is a mirror, reflecting our own potential and helping us reach heights that were previously inaccessible.
              </p>
              <p>
                In the coming months, we will see even more sophisticated iterations of these technologies. Staying curious and adaptable will be the most valuable skills for any professional in this field.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-12 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <button className="flex items-center space-x-2 text-slate-500 hover:text-red-500 transition-colors font-bold uppercase text-[11px] tracking-widest">
                <Heart className="w-5 h-5" />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 text-slate-500 hover:text-blue-500 transition-colors font-bold uppercase text-[11px] tracking-widest">
                <MessageSquare className="w-5 h-5" />
                <span>Comment</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors font-bold uppercase text-[11px] tracking-widest">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
