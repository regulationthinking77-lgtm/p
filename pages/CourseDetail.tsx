
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Users, 
  Clock, 
  ShieldCheck, 
  PlayCircle, 
  CheckCircle2, 
  ArrowLeft,
  Share2,
  Bookmark,
  X,
  CreditCard,
  Smartphone,
  Wallet,
  Loader2
} from 'lucide-react';
import { Course } from '../types';

interface CourseDetailProps {
  courses: Course[];
}

const CourseDetail: React.FC<CourseDetailProps> = ({ courses }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | 'wallet'>('card');

  if (!course) {
    return (
      <div className="pt-40 pb-24 bg-[#131619] min-h-screen text-center">
        <h2 className="text-3xl font-black text-white">Course not found.</h2>
        <Link to="/courses" className="text-orange-500 mt-4 inline-block font-bold underline">Back to Courses</Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    setIsPaymentModalOpen(true);
    setPaymentStep('checkout');
  };

  const handleProcessPayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
    }, 2500);
  };

  const closePayment = () => {
    setIsPaymentModalOpen(false);
    if (paymentStep === 'success') {
      // Potentially redirect to "My Courses" in a real app
    }
  };

  // Mock Curriculum Data
  const curriculum = [
    { title: "Introduction and Setup", duration: "12:45", isPreview: true },
    { title: "Foundations & Principles", duration: "45:20", isPreview: false },
    { title: "Hands-on Practical Exercise", duration: "1:05:10", isPreview: false },
    { title: "Advanced Techniques & Workflows", duration: "52:15", isPreview: false },
    { title: "Capstone Project Overview", duration: "15:00", isPreview: false },
  ];

  const highlights = [
    "Full lifetime access",
    "Access on mobile and TV",
    "Certificate of completion",
    "24/7 Instructor support",
    "Downloadable resources"
  ];

  return (
    <div className="pt-32 pb-24 bg-[#131619] min-h-screen">
      <div className="container mx-auto px-4 md:px-16">
        <Link to="/courses" className="inline-flex items-center space-x-2 text-slate-500 hover:text-white transition-colors mb-12 font-bold group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Courses</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content Area */}
          <div className="lg:w-2/3 space-y-12">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {course.category}
                </span>
                <span className="bg-white/5 border border-white/10 text-slate-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {course.level}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-8 pt-2">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
                  <span className="text-white font-black">{course.rating}</span>
                  <span className="text-slate-500 font-medium">(1,250+ reviews)</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <Users className="w-5 h-5" />
                  <span className="font-bold">{course.students.toLocaleString()}+ Students enrolled</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-black text-white text-lg">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Instructor</div>
                  <div className="text-white font-bold">{course.instructor}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Course Overview</h3>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                {course.description}
                <br /><br />
                Whether you're just starting out or looking to sharpen your existing skills, this course provides a structured path to mastery. You'll work on real-world projects that simulate industry challenges, ensuring you gain practical experience alongside theoretical knowledge.
              </p>
            </div>

            {/* Curriculum */}
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-white">Course Curriculum</h3>
              <div className="bg-[#1a1d21] rounded-[40px] border border-white/5 overflow-hidden">
                {curriculum.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`p-8 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors ${idx !== curriculum.length - 1 ? 'border-b border-white/5' : ''}`}
                  >
                    <div className="flex items-center space-x-6">
                      <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:text-orange-500 transition-all">
                        <PlayCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-bold">{item.title}</div>
                        <div className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Video • {item.duration}</div>
                      </div>
                    </div>
                    {item.isPreview && (
                      <span className="text-[10px] font-black uppercase text-orange-500 border border-orange-500/30 px-3 py-1 rounded-full">Preview</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Sticky Buy Card */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              <div className="bg-[#1a1d21] rounded-[48px] overflow-hidden border border-white/10 shadow-2xl relative">
                <div className="relative aspect-video">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer group">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 group-hover:scale-110 transition-all">
                      <PlayCircle className="w-10 h-10 text-white fill-white" />
                    </div>
                    <div className="absolute bottom-4 text-center w-full text-white text-[10px] font-black uppercase tracking-widest">Preview this course</div>
                  </div>
                </div>

                <div className="p-10 space-y-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">Price</div>
                      <div className="text-5xl font-black text-white tracking-tighter">${course.price}</div>
                    </div>
                    <div className="text-right">
                       <span className="line-through text-slate-600 font-bold block">${(course.price * 1.5).toFixed(2)}</span>
                       <span className="text-green-500 text-xs font-black uppercase">33% Off</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={handleBuyNow}
                      className="w-full orange-gradient text-white py-5 rounded-[24px] font-black text-lg shadow-[0_15px_30px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Buy Now
                    </button>
                    <button className="w-full bg-white/5 border border-white/10 text-white py-5 rounded-[24px] font-black text-lg hover:bg-white/10 transition-all">
                      Add to Cart
                    </button>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest">This course includes:</div>
                    <div className="space-y-4">
                      {highlights.map((h, i) => (
                        <div key={i} className="flex items-center space-x-3 text-slate-400 text-sm font-bold">
                           <ShieldCheck className="w-4 h-4 text-orange-400" />
                           <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-10 pt-6 border-t border-white/5">
                    <button className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest">
                       <Share2 className="w-4 h-4" />
                       <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest">
                       <Bookmark className="w-4 h-4" />
                       <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Secure Checkout Badge */}
              <div className="flex items-center justify-center space-x-3 text-slate-600">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Checkout Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#1a1d21] w-full max-w-xl rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/10">
            {paymentStep !== 'processing' && (
              <button 
                onClick={closePayment} 
                className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full transition-all text-slate-400 z-20"
              >
                <X className="w-6 h-6" />
              </button>
            )}

            {paymentStep === 'checkout' && (
              <div className="p-12 space-y-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white tracking-tight">Checkout</h2>
                  <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Complete your purchase</p>
                </div>

                {/* Course Summary */}
                <div className="bg-white/5 rounded-[32px] p-8 flex items-center space-x-6 border border-white/5">
                  <img src={course.image} className="w-20 h-20 rounded-2xl object-cover" alt={course.title} />
                  <div>
                    <h3 className="text-white font-bold leading-tight mb-1">{course.title}</h3>
                    <div className="text-orange-500 font-black text-xl">${course.price}</div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Payment Method</label>
                  <div className="grid grid-cols-1 gap-4">
                    <button 
                      onClick={() => setSelectedMethod('card')}
                      className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${selectedMethod === 'card' ? 'border-orange-500 bg-orange-500/5' : 'border-white/10 bg-white/2'}`}
                    >
                      <div className="flex items-center space-x-4">
                        <CreditCard className={`w-6 h-6 ${selectedMethod === 'card' ? 'text-orange-500' : 'text-slate-500'}`} />
                        <span className={`font-bold ${selectedMethod === 'card' ? 'text-white' : 'text-slate-400'}`}>Credit / Debit Card</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'card' ? 'border-orange-500' : 'border-white/20'}`}>
                         {selectedMethod === 'card' && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => setSelectedMethod('upi')}
                      className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${selectedMethod === 'upi' ? 'border-orange-500 bg-orange-500/5' : 'border-white/10 bg-white/2'}`}
                    >
                      <div className="flex items-center space-x-4">
                        <Smartphone className={`w-6 h-6 ${selectedMethod === 'upi' ? 'text-orange-500' : 'text-slate-500'}`} />
                        <span className={`font-bold ${selectedMethod === 'upi' ? 'text-white' : 'text-slate-400'}`}>UPI (GPay, PhonePe)</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'upi' ? 'border-orange-500' : 'border-white/20'}`}>
                         {selectedMethod === 'upi' && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
                      </div>
                    </button>

                    <button 
                      onClick={() => setSelectedMethod('wallet')}
                      className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${selectedMethod === 'wallet' ? 'border-orange-500 bg-orange-500/5' : 'border-white/10 bg-white/2'}`}
                    >
                      <div className="flex items-center space-x-4">
                        <Wallet className={`w-6 h-6 ${selectedMethod === 'wallet' ? 'text-orange-500' : 'text-slate-500'}`} />
                        <span className={`font-bold ${selectedMethod === 'wallet' ? 'text-white' : 'text-slate-400'}`}>Net Banking</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'wallet' ? 'border-orange-500' : 'border-white/20'}`}>
                         {selectedMethod === 'wallet' && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
                      </div>
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={handleProcessPayment}
                    className="w-full orange-gradient text-white py-6 rounded-[28px] font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Pay ${course.price}
                  </button>
                  <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-6 flex items-center justify-center space-x-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Bank-level 256-bit encryption</span>
                  </p>
                </div>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="p-24 flex flex-col items-center justify-center text-center space-y-10">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white/5 border-t-orange-500 animate-spin"></div>
                  <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-orange-500/50" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-white">Securely Processing</h3>
                  <p className="text-slate-500 font-bold max-w-xs leading-relaxed">Please don't refresh the page while we confirm your payment with the bank.</p>
                </div>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="p-16 flex flex-col items-center justify-center text-center space-y-10 animate-in slide-in-from-bottom-8 duration-500">
                <div className="w-28 h-28 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                  <CheckCircle2 className="w-14 h-14 text-green-500" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-black text-white">Payment Successful!</h3>
                  <p className="text-slate-400 font-medium max-w-xs mx-auto">Welcome to the course! You now have full lifetime access to {course.title}.</p>
                </div>
                
                <div className="w-full pt-8 space-y-4">
                  <button 
                    onClick={() => navigate('/courses')}
                    className="w-full bg-white text-black py-5 rounded-[24px] font-black text-lg hover:bg-slate-200 transition-all"
                  >
                    Start Learning
                  </button>
                  <button 
                    onClick={closePayment}
                    className="w-full text-slate-500 font-black uppercase text-[11px] tracking-widest hover:text-white transition-colors"
                  >
                    Back to Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
