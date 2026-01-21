
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Save, Globe, Lock, Palette, BellRing, Smartphone, Image as ImageIcon, Upload, Layout } from 'lucide-react';
import { SiteSettings } from '../types';

interface AdminSettingsProps {
  settings: SiteSettings;
  onUpdateSettings: (settings: SiteSettings) => void;
  onExitAdmin: () => void;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, onUpdateSettings, onExitAdmin }) => {
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);

  const handleToggle = (key: keyof SiteSettings) => {
    setLocalSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key: keyof SiteSettings, value: string) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('heroImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdateSettings(localSettings);
    alert('Settings saved successfully!');
  };

  return (
    <AdminLayout onExitAdmin={onExitAdmin}>
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Platform Settings</h1>
            <p className="text-slate-500">Configure global behavior and home page content.</p>
          </div>
          <button 
            onClick={handleSave}
            className="orange-gradient text-white px-10 py-4 rounded-2xl font-black flex items-center space-x-3 shadow-xl hover:scale-105 transition-all active:scale-95"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* HERO SECTION SETTINGS */}
            <section className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
              <div className="flex items-center space-x-4 mb-4">
                 <div className="p-3 bg-purple-50 rounded-2xl text-purple-600"><Layout className="w-6 h-6" /></div>
                 <h3 className="text-xl font-bold text-slate-900">Home Page Hero Section</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                   <div className="space-y-3 flex-shrink-0">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Hero Image</label>
                      <div className="relative group">
                        <div className="w-40 h-40 rounded-full border-[6px] border-slate-100 overflow-hidden bg-slate-50">
                          <img src={localSettings.heroImage} className="w-full h-full object-cover grayscale-[20%]" alt="Hero Preview" />
                        </div>
                        <label className="absolute bottom-2 right-2 p-3 bg-blue-600 text-white rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-all active:scale-90">
                           <Upload className="w-4 h-4" />
                           <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      </div>
                   </div>

                   <div className="flex-grow space-y-6 w-full">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Main Heading</label>
                        <input 
                          type="text" 
                          value={localSettings.heroHeading}
                          onChange={(e) => handleChange('heroHeading', e.target.value)}
                          className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold"
                        />
                        <p className="text-[10px] text-slate-400 italic">Pro-tip: Include "Your Future" for special purple highlighting.</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Subheading Description</label>
                        <textarea 
                          rows={3}
                          value={localSettings.heroSubheading}
                          onChange={(e) => handleChange('heroSubheading', e.target.value)}
                          className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold leading-relaxed"
                        />
                      </div>
                   </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
              <div className="flex items-center space-x-4 mb-4">
                 <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Globe className="w-6 h-6" /></div>
                 <h3 className="text-xl font-bold text-slate-900">General Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Site Display Name</label>
                  <input 
                    type="text" 
                    value={localSettings.siteName}
                    onChange={(e) => handleChange('siteName', e.target.value)}
                    className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Meta Title (SEO)</label>
                  <input 
                    type="text" 
                    value={localSettings.metaTitle}
                    onChange={(e) => handleChange('metaTitle', e.target.value)}
                    className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Meta Description (SEO)</label>
                <textarea 
                  rows={3}
                  value={localSettings.metaDescription}
                  onChange={(e) => handleChange('metaDescription', e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold"
                />
              </div>
            </section>

            <section className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
               <div className="flex items-center space-x-4 mb-4">
                 <div className="p-3 bg-orange-50 rounded-2xl text-orange-600"><Lock className="w-6 h-6" /></div>
                 <h3 className="text-xl font-bold text-slate-900">Advanced Controls</h3>
              </div>

              <div className="divide-y divide-slate-100">
                <ToggleRow 
                  label="Accept Payments" 
                  desc="Enable or disable standard checkout across the site." 
                  enabled={localSettings.paymentsEnabled} 
                  onToggle={() => handleToggle('paymentsEnabled')} 
                />
                <ToggleRow 
                  label="Maintenance Mode" 
                  desc="Redirect all users to a maintenance screen." 
                  enabled={localSettings.maintenanceMode} 
                  onToggle={() => handleToggle('maintenanceMode')} 
                />
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-[#131619] text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-lg font-black mb-6 uppercase tracking-widest text-orange-400">Appearance Preview</h3>
                 <div className="space-y-6">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                       <div className="w-full aspect-video rounded-xl bg-slate-800 overflow-hidden relative">
                          <img src={localSettings.heroImage} className="w-full h-full object-cover opacity-60" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-full px-4 text-center">
                                <div className="text-[10px] font-black leading-tight truncate">{localSettings.heroHeading}</div>
                             </div>
                          </div>
                       </div>
                       <p className="text-[9px] text-slate-500 text-center font-bold">LIVE HOME PAGE PREVIEW</p>
                    </div>
                 </div>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const ToggleRow = ({ label, desc, enabled, onToggle }: any) => (
  <div className="py-6 flex items-center justify-between gap-10">
    <div>
      <div className="font-bold text-slate-900">{label}</div>
      <div className="text-xs text-slate-500 font-medium mt-1">{desc}</div>
    </div>
    <button 
      onClick={onToggle}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${enabled ? 'bg-orange-500' : 'bg-slate-300'}`}
    >
      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${enabled ? 'left-8' : 'left-1'}`}></div>
    </button>
  </div>
);

export default AdminSettings;
