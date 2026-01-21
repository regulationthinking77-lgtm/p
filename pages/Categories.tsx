
import React from 'react';
import { 
  PenTool, 
  Code, 
  BarChart, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Zap 
} from 'lucide-react';

const CATEGORY_DETAILS = [
  {
    title: 'UI/UX Design',
    description: 'Master the principles of user-centric design. From user research and wireframing to high-fidelity prototyping and design systems, this section covers everything you need to become a professional designer.',
    features: ['Figma Mastery', 'Visual Identity Design', 'User Psychology', 'Design Thinking Workshops'],
    duration: '12 Weeks',
    icon: <PenTool className="w-12 h-12 text-white" />,
    color: '#ff4d94'
  },
  {
    title: 'Web Development',
    description: 'Build modern, responsive websites and applications. Start with the basics of HTML/CSS and progress to advanced frameworks like React, Next.js, and backend integration with Node.js.',
    features: ['Fullstack React', 'Responsive Architecture', 'API Integration', 'Database Management'],
    duration: '16 Weeks',
    icon: <Code className="w-12 h-12 text-white" />,
    color: '#ff9f43'
  },
  {
    title: 'Digital Marketing',
    description: 'Grow brands in the digital age. Learn SEO, SEM, social media strategy, and data analytics to drive results and build high-converting campaigns across all platforms.',
    features: ['Advanced SEO', 'Social Media Strategy', 'Performance Analytics', 'Email Automation'],
    duration: '8 Weeks',
    icon: <BarChart className="w-12 h-12 text-white" />,
    color: '#48dbfb'
  },
  {
    title: 'Practical Learning',
    description: 'Bridge the gap between theory and practice. Work on real-world industry projects, attend live workshops, and build a professional portfolio that stands out to top-tier recruiters.',
    features: ['Industry Internships', 'Portfolio Building', 'Live Mentor Sessions', 'Case Study Analysis'],
    duration: 'Ongoing',
    icon: <BookOpen className="w-12 h-12 text-white" />,
    color: '#a29bfe'
  }
];

const Categories: React.FC = () => {
  return (
    <div className="pt-40 pb-24 bg-[#131619] min-h-screen">
      <div className="container mx-auto px-4 md:px-16">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8">Career Paths</h1>
          <p className="text-slate-400 text-xl font-medium">
            Explore our curated learning journeys designed to take you from beginner to industry professional.
          </p>
        </div>

        <div className="space-y-32">
          {CATEGORY_DETAILS.map((cat, i) => (
            <div 
              key={cat.title} 
              className={`flex flex-col lg:flex-row items-center gap-16 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="lg:w-1/2">
                <div 
                  className="w-full aspect-square rounded-[64px] flex items-center justify-center relative overflow-hidden shadow-2xl"
                  style={{ backgroundColor: cat.color }}
                >
                   <div className="absolute inset-0 bg-black/10"></div>
                   <div className="relative z-10 p-16 bg-white/10 backdrop-blur-3xl rounded-[48px] border border-white/20">
                     {cat.icon}
                   </div>
                </div>
              </div>

              <div className="lg:w-1/2 space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="h-px w-12 bg-orange-500"></span>
                    <span className="text-orange-500 font-black uppercase tracking-widest text-sm">Specialization</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">{cat.title}</h2>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium">
                    {cat.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {cat.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3 text-white font-bold">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-6">
                  <div className="flex items-center space-x-3 bg-white/5 px-6 py-4 rounded-2xl border border-white/10">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-300 font-bold">{cat.duration}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/5 px-6 py-4 rounded-2xl border border-white/10">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-slate-300 font-bold">Certification Included</span>
                  </div>
                </div>

                <button className="orange-gradient text-white px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl">
                  Explore {cat.title} Courses
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
