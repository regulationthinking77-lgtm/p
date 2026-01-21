
import React from 'react';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import { Course, SiteSettings } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { 
  ChevronRight, 
  ArrowRight,
  PenTool, 
  Code, 
  BarChart, 
  BookOpen,
  CheckCircle2,
  Clock,
  Zap,
  Calendar,
  User,
  Heart,
  MessageSquare,
  Activity,
  ShieldCheck,
  Globe,
  Award
} from 'lucide-react';

interface HomeProps {
  courses: Course[];
  settings: SiteSettings;
}

const CATEGORY_DETAILS = [
  {
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    description: 'Master the principles of user-centric design. From user research and wireframing to high-fidelity prototyping and design systems, this section covers everything you need to become a professional designer.',
    features: ['Figma Mastery', 'Visual Identity Design', 'User Psychology', 'Design Thinking Workshops'],
    duration: '12 Weeks',
    icon: <PenTool />,
    color: '#ff2d55'
  },
  {
    title: 'Web Development',
    slug: 'web-development',
    description: 'Build modern, responsive websites and applications. Start with the basics of HTML/CSS and progress to advanced frameworks like React, Next.js, and backend integration with Node.js.',
    features: ['Fullstack React', 'Responsive Architecture', 'API Integration', 'Database Management'],
    duration: '16 Weeks',
    icon: <Code />,
    color: '#ff9500'
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    description: 'Grow brands in the digital age. Learn SEO, SEM, social media strategy, and data analytics to drive results and build high-converting campaigns across all platforms.',
    features: ['Advanced SEO', 'Social Media Strategy', 'Performance Analytics', 'Email Automation'],
    duration: '8 Weeks',
    icon: <Activity />,
    color: '#00bcd4'
  },
  {
    title: 'Practical Learning',
    slug: 'practical-learning',
    description: 'Bridge the gap between theory and practice. Work on real-world industry projects, attend live workshops, and build a professional portfolio that stands out to top-tier recruiters.',
    features: ['Industry Internships', 'Portfolio Building', 'Live Mentor Sessions', 'Case Study Analysis'],
    duration: 'Ongoing',
    icon: <BookOpen />,
    color: '#a29bfe'
  }
];

const Home: React.FC<HomeProps> = ({ courses, settings }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0f1113] relative overflow-hidden">
      <Hero 
        heading={settings.heroHeading} 
        subheading={settings.heroSubheading} 
        image={settings.heroImage} 
      />

      {/* Trust Bar */}
      <div className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-10">Trusted by world-class industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-30 grayscale contrast-125">
             <div className="text-2xl font-black text-white">GOOGLE</div>
             <div className="text-2xl font-black text-white">META</div>
             <div className="text-2xl font-black text-white">AIRBNB</div>
             <div className="text-2xl font-black text-white">STRIPE</div>
             <div className="text-2xl font-black text-white">ADOBE</div>
          </div>
        </div>
      </div>

      {/* Specialization Section */}
      <section className="py-48 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="space-y-64">
          {CATEGORY_DETAILS.map((cat, i) => (
            <div 
              key={cat.title} 
              className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="lg:w-[45%] w-full flex justify-center">
                <div 
                  className="w-full max-w-[500px] aspect-square rounded-[80px] flex items-center justify-center relative overflow-hidden shadow-[0_60px_100px_rgba(0,0,0,0.5)] group transition-transform duration-700 hover:scale-[1.02]"
                  style={{ backgroundColor: cat.color }}
                >
                   <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
                   <div className="relative z-10 p-12 lg:p-16 bg-white/10 backdrop-blur-3xl rounded-[60px] border border-white/20 transform group-hover:scale-110 transition-transform duration-700 flex items-center justify-center shadow-2xl">
                     {React.cloneElement(cat.icon as React.ReactElement, { className: "w-20 h-20 lg:w-24 lg:h-24 text-white" })}
                   </div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 blur-[80px] rounded-full"></div>
                </div>
              </div>

              <div className="lg:w-[55%] space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="h-[2px] w-12 bg-orange-500"></span>
                    <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[11px]">Specialization Track</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-[64px] font-black text-white leading-[1.1] tracking-tighter">{cat.title}</h2>
                  <p className="text-slate-400 text-lg lg:text-xl leading-relaxed font-medium opacity-80">
                    {cat.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
                  {cat.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3 text-white/90 font-bold text-base lg:text-[17px]">
                      <div className="bg-green-500/10 p-1 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      </div>
                      <span className="tracking-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-5 pt-2">
                  <div className="flex items-center space-x-3 bg-[#1a1c1e] px-6 py-4 rounded-[22px] border border-white/10 shadow-xl">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-200 font-black text-[12px] uppercase tracking-widest">{cat.duration}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-[#1a1c1e] px-6 py-4 rounded-[22px] border border-white/10 shadow-xl">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <span className="text-slate-200 font-black text-[12px] uppercase tracking-widest">Global Certification</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/category/${cat.slug}`)}
                  className="orange-gradient text-white px-12 py-6 rounded-[24px] font-black text-lg hover:scale-[1.03] transition-all shadow-[0_30px_60px_rgba(245,158,11,0.3)] active:scale-95 group flex items-center space-x-4"
                >
                  <span>Explore {cat.title} Track</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-40 bg-white/[0.01] border-y border-white/5">
         <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-24">
               <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[11px] mb-4 block">The Advantage</span>
               <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8">Why E-Online is different.</h2>
               <p className="text-slate-400 text-lg font-medium opacity-70">We focus on outcomes, not just outputs. Our platform is built to simulate real job environments.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <FeatureCard 
                 icon={<ShieldCheck className="w-8 h-8" />} 
                 title="Accredited Modules" 
                 desc="Every course is vetted by industry experts to meet current hiring standards." 
               />
               <FeatureCard 
                 icon={<Globe className="w-8 h-8" />} 
                 title="Global Alumni" 
                 desc="Join a network of 1M+ learners working in 140+ countries across the globe." 
               />
               <FeatureCard 
                 icon={<Award className="w-8 h-8" />} 
                 title="Lifetime Mentorship" 
                 desc="Get direct access to senior professionals who help you navigate your career path." 
               />
            </div>
         </div>
      </section>

      {/* Knowledge Hub Section */}
      <section className="py-40 container mx-auto px-6 md:px-12 lg:px-20 bg-[#0f1113]">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <span className="text-orange-500 font-black uppercase tracking-[0.2em] text-xs mb-4 block">Our Journal</span>
            <h1 className="text-5xl md:text-[64px] font-black text-white mb-6 leading-none tracking-tighter">Knowledge Hub</h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-lg opacity-70">
              Insights, tutorials, and success stories from digital education.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex items-center space-x-8 shadow-2xl">
            <div className="text-right">
              <div className="text-white font-black text-3xl tracking-tighter">50K+</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Subscribers</div>
            </div>
            <button className="bg-white text-black px-10 py-4 rounded-2xl font-black text-[14px] hover:scale-105 transition-all shadow-xl active:scale-95">Join Them</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {BLOG_POSTS.slice(0, 4).map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="group cursor-pointer bg-[#1a1d21]/60 rounded-[50px] overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all flex flex-col md:flex-row h-full shadow-2xl"
            >
              <div className="md:w-[40%] relative h-64 md:h-auto overflow-hidden">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:hidden"></div>
              </div>
              <div className="md:w-[60%] p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-orange-400 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-[15px] mb-8 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                   <div className="flex items-center space-x-3 text-slate-400">
                     <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-[12px] font-black border border-white/10">{post.author.charAt(0)}</div>
                     <span className="text-[12px] font-bold tracking-tight">{post.author}</span>
                   </div>
                   <div className="flex items-center space-x-5">
                     <button className="text-slate-500 hover:text-red-500 transition-colors flex items-center space-x-1.5">
                       <Heart className="w-4 h-4" />
                     </button>
                     <button className="text-slate-500 hover:text-blue-500 transition-colors flex items-center space-x-1.5">
                       <MessageSquare className="w-4 h-4" />
                     </button>
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 container mx-auto px-6 md:px-12">
        <div className="bg-[#1a1c1e] border border-white/5 rounded-[80px] md:rounded-[120px] p-20 md:p-32 relative overflow-hidden flex flex-col items-center text-center shadow-[0_80px_160px_-20px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.08] to-purple-500/[0.08]"></div>
          <h2 className="text-4xl md:text-8xl font-black text-white mb-12 relative z-10 leading-[1] tracking-tighter">
            Build Your Legacy <br /> <span className="text-slate-600">Master the Future.</span>
          </h2>
          <p className="text-slate-400 text-xl lg:text-2xl max-w-3xl mb-16 relative z-10 font-medium leading-relaxed opacity-60">
            Join the world's most innovative learning community and accelerate your career with practical expertise.
          </p>
          <button 
            onClick={() => navigate('/courses')}
            className="orange-gradient text-white px-20 py-8 rounded-full font-black text-2xl hover:scale-[1.05] transition-all shadow-[0_40px_80px_rgba(245,158,11,0.5)] active:scale-95 relative z-10"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-12 bg-white/5 rounded-[56px] border border-white/5 hover:border-orange-500/20 transition-all group">
     <div className="w-16 h-16 rounded-[28px] bg-orange-500/10 flex items-center justify-center text-orange-500 mb-8 group-hover:scale-110 transition-transform shadow-inner border border-orange-500/20">
        {icon}
     </div>
     <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{title}</h3>
     <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Home;
