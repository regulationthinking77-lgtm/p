import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BarChart3, Layout, Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  heading: string;
  subheading: string;
  image: string;
}

const Hero: React.FC<HeroProps> = ({ heading, subheading, image }) => {
  const navigate = useNavigate();

  const renderHeading = () => {
    if (heading.includes('Your Future')) {
      const parts = heading.split('Your Future');
      return (
        <>
          {parts[0]}
          <span className="text-[#a78bfa] relative inline-block">
            Your Future
          </span>
          {parts[1]}
        </>
      );
    }
    return heading;
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#0f1113]">
      {/* Background Decorative Glows */}
      <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full"></div>

      {/* Social Links (Left) */}
      <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col space-y-4 z-20">
        {[Facebook, Twitter, Instagram].map((Icon, idx) => (
          <div key={idx} className="p-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/5 text-white/30 hover:text-white transition-all cursor-pointer group">
            <Icon className="w-4 h-4" />
          </div>
        ))}
      </div>

      {/* Vertical Indicator (Right) */}
      <div className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 h-80 w-[1px] bg-white/10 z-20">
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[3px] h-[60px] bg-gradient-to-b from-orange-400 to-red-500 rounded-full shadow-[0_0_15px_rgba(251,146,60,0.5)]"></div>
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] border-2 border-orange-500 cursor-pointer"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Main Glass Card Wrapper - Using the Charcoal Palette */}
        <div className="glass-dark rounded-[60px] p-10 md:p-16 lg:p-24 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="lg:w-[60%] text-left space-y-10">
              <div className="inline-flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B1B2B5]">
                <Layout className="w-3.5 h-3.5" />
                <span>Next Generation Learning</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-[84px] font-extrabold text-white leading-[1.05] tracking-tight">
                {renderHeading()}
              </h1>
              
              <p className="text-[#B1B2B5] text-lg md:text-xl max-w-lg leading-relaxed font-medium">
                {subheading}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 pt-4">
                <button 
                  onClick={() => navigate('/courses')}
                  className="bg-white text-slate-900 px-10 py-5 rounded-full font-black text-lg hover:bg-slate-100 transition-all flex items-center space-x-3 active:scale-95 shadow-xl"
                >
                  <span>Start Exploring</span>
                  <div className="bg-slate-900/10 p-1 rounded-md">
                     <ArrowUpRight className="w-4 h-4 text-slate-900" />
                  </div>
                </button>
                
                <div className="flex space-x-12">
                  <div className="space-y-1">
                    <div className="text-3xl font-black text-white">50+</div>
                    <div className="text-[10px] font-black text-[#7D8491] uppercase tracking-widest">Courses</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-black text-white">1M+</div>
                    <div className="text-[10px] font-black text-[#7D8491] uppercase tracking-widest">Students</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Visual Elements */}
            <div className="lg:w-[40%] relative w-full flex justify-center lg:justify-end mt-12 lg:mt-0">
              <div className="relative w-full max-w-[420px] aspect-square">
                
                {/* Main Image Container */}
                <div className="absolute inset-0 rounded-[50px] overflow-hidden border border-white/10 bg-[#3D3F4A] shadow-2xl z-10">
                  <img 
                    src={image} 
                    alt="Hero Visual" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Floating "175K" Card */}
                <div className="absolute -top-6 -right-6 md:-right-10 glass-dark border border-white/10 p-5 rounded-[28px] shadow-2xl flex items-center space-x-4 animate-float z-20">
                  <div className="p-3 orange-gradient rounded-2xl shadow-[0_10px_20px_rgba(245,158,11,0.4)]">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-white">175K</div>
                    <div className="text-[9px] font-black text-[#B1B2B5] uppercase tracking-widest">Active Learners</div>
                  </div>
                </div>

                {/* Floating Chart Card */}
                <div className="absolute -bottom-8 -left-8 md:-left-16 glass-dark border border-white/10 p-8 rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.5)] w-[260px] animate-float-delayed z-20">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-[10px] font-black text-[#B1B2B5] uppercase tracking-[0.2em]">Success Rate</div>
                    <BarChart3 className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="flex items-end space-x-3 h-14">
                    {[40, 65, 35, 90, 60, 75].map((h, i) => (
                      <div 
                        key={i} 
                        style={{ height: `${h}%` }} 
                        className={`flex-1 rounded-md transition-all duration-1000 ${i === 3 ? 'bg-orange-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]' : 'bg-white/10'}`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Decorative Dots */}
                <div className="absolute top-[40%] -left-3 w-4 h-4 bg-white/80 rounded-full border-4 border-white/10 shadow-lg z-20"></div>
                <div className="absolute bottom-[30%] -right-3 w-6 h-6 bg-orange-500 rounded-full border-8 border-white/10 shadow-xl z-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(15px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;