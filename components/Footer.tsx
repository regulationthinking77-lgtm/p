import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} className="text-slate-500 hover:text-white hover:translate-x-1 transition-all inline-block font-medium">
    {children}
  </a>
);

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-orange-500 hover:text-white transition-all text-slate-500 border border-white/5">
    {icon}
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#131619] text-slate-300 pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <span className="text-3xl font-[900] tracking-tighter uppercase bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] bg-clip-text text-transparent">
              DIPTO
            </span>
            <p className="leading-relaxed text-slate-500 font-medium">
              Revolutionizing online education with top-tier career courses and an interactive learning experience.
            </p>
            <div className="flex items-center space-x-4">
              <SocialIcon icon={<Facebook className="w-4 h-4" />} />
              <SocialIcon icon={<Twitter className="w-4 h-4" />} />
              <SocialIcon icon={<Instagram className="w-4 h-4" />} />
              <SocialIcon icon={<Linkedin className="w-4 h-4" />} />
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-4">
              <li><FooterLink href="#">Home</FooterLink></li>
              <li><FooterLink href="#">Category</FooterLink></li>
              <li><FooterLink href="#">Courses</FooterLink></li>
              <li><FooterLink href="#">Blog</FooterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 text-sm uppercase tracking-widest">Support</h4>
            <ul className="space-y-4">
              <li><FooterLink href="#">Help Center</FooterLink></li>
              <li><FooterLink href="#">Career Assistance</FooterLink></li>
              <li><FooterLink href="#">Terms of Use</FooterLink></li>
              <li><FooterLink href="#">Privacy Policy</FooterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 text-sm uppercase tracking-widest">Join Newsletter</h4>
            <p className="mb-6 text-slate-500 font-medium">Subscribe for latest course updates.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
              />
              <button className="w-full mt-4 orange-gradient text-white font-black py-4 rounded-2xl transition-all shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs font-bold text-slate-600 uppercase tracking-widest">
          <p>© 2024 DIPTO. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;