
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Course } from '../types';
import { Plus, Trash2, Edit3, Search, Sparkles, X, Upload, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { db } from '../firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

interface AdminCoursesProps {
  courses: Course[];
  onUpdateCourses: (courses: Course[]) => void;
  onExitAdmin: () => void;
}

const AdminCourses: React.FC<AdminCoursesProps> = ({ courses, onUpdateCourses, onExitAdmin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: '',
    category: 'Development',
    price: 49.99,
    description: '',
    image: '',
    level: 'Beginner',
    status: 'Published'
  });

  const handleOpenEdit = (course: Course) => {
    setEditingCourseId(course.id);
    setNewCourse({
      title: course.title,
      category: course.category,
      price: course.price,
      description: course.description,
      image: course.image,
      level: course.level,
      status: course.status
    });
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (course: Course) => {
    const newStatus = course.status === 'Published' ? 'Draft' : 'Published';
    try {
      await setDoc(doc(db, 'courses', course.id), { ...course, status: newStatus });
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Permanently delete this course? This action is irreversible.')) {
      try {
        await deleteDoc(doc(db, 'courses', id));
      } catch (error) {
        alert("Failed to delete course.");
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCourse(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiGenerate = async () => {
    if (!newCourse.title) {
       alert("Enter a title first for the AI to understand context.");
       return;
    }

    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a high-converting, professional course description for "${newCourse.title}" in the ${newCourse.category} category. Focus on value proposition. Keep it under 100 words. Return only text.`,
      });

      if (response.text) {
        setNewCourse(prev => ({ ...prev, description: response.text.trim() }));
      }
    } catch (error) {
      alert("AI failed to respond. Please write manually.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = async () => {
    if (!newCourse.title || !newCourse.description || !newCourse.image) {
      alert("Please ensure all fields are complete.");
      return;
    }

    const id = editingCourseId || `course-${Date.now()}`;
    const courseToAdd: Course = {
      id: id,
      title: newCourse.title || '',
      category: newCourse.category || 'Development',
      price: Number(newCourse.price) || 0,
      description: newCourse.description || '',
      image: newCourse.image || '',
      instructor: 'Dipto Islam',
      rating: 4.5,
      students: editingCourseId ? courses.find(c => c.id === editingCourseId)?.students || 0 : 0,
      level: newCourse.level as any || 'Beginner',
      status: newCourse.status as any || 'Published',
      updatedAt: new Date().toISOString().split('T')[0]
    };

    try {
      await setDoc(doc(db, 'courses', id), courseToAdd);
      closeModal();
    } catch (error) {
      alert("Failed to save course.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourseId(null);
    setNewCourse({
      title: '',
      category: 'Development',
      price: 49.99,
      description: '',
      image: '',
      level: 'Beginner',
      status: 'Published'
    });
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout onExitAdmin={onExitAdmin}>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Catalogue Management</h1>
            <p className="text-slate-500">Manage, edit, and publish your educational content.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#2563eb] text-white px-8 py-4 rounded-2xl font-black flex items-center space-x-2 hover:bg-blue-700 transition-all shadow-xl active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Course</span>
          </button>
        </div>

        <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by title or tags..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-slate-50 rounded-[24px] border-none focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold placeholder-slate-400 outline-none"
            />
          </div>
          <select className="bg-slate-50 border-none rounded-[24px] px-8 py-5 text-slate-600 font-black uppercase text-xs tracking-widest min-w-[220px] outline-none">
            <option>All Categories</option>
            <option>Design</option>
            <option>Development</option>
            <option>Business</option>
            <option>Marketing</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div key={course.id} className={`bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500 ${course.status === 'Draft' ? 'opacity-60' : ''}`}>
              <div className="relative h-64 overflow-hidden">
                <img src={course.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={course.title} />
                <div className="absolute top-6 right-6 flex space-x-3">
                   <button 
                    onClick={() => handleToggleStatus(course)}
                    className={`p-3 bg-white/95 backdrop-blur-md rounded-2xl transition-all shadow-xl active:scale-90 ${course.status === 'Published' ? 'text-green-600 hover:bg-green-600 hover:text-white' : 'text-slate-400 hover:bg-slate-600 hover:text-white'}`}
                   >
                     {course.status === 'Published' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                   </button>
                   <button 
                    onClick={() => handleOpenEdit(course)}
                    className="p-3 bg-white/95 backdrop-blur-md rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-90"
                   >
                     <Edit3 className="w-4 h-4" />
                   </button>
                   <button 
                    onClick={() => handleDelete(course.id)}
                    className="p-3 bg-white/95 backdrop-blur-md rounded-2xl text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-90"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
                <div className="absolute bottom-6 left-6 bg-blue-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                  {course.category}
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-black text-slate-900 line-clamp-1">{course.title}</h3>
                </div>
                <p className="text-slate-500 mb-8 line-clamp-2 font-medium leading-relaxed">{course.description}</p>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-3xl font-black text-blue-600 tracking-tighter">${course.price}</span>
                  <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${course.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {course.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.25)] overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/20">
            <div className="px-12 py-10 flex items-center justify-between">
              <h2 className="text-[28px] font-black text-slate-900 tracking-tight">
                {editingCourseId ? 'Update Course' : 'Create New Course'}
              </h2>
              <button onClick={closeModal} className="p-3 hover:bg-slate-100 rounded-full transition-all text-slate-400 active:scale-90">
                <X className="w-7 h-7" />
              </button>
            </div>
            
            <div className="px-12 pb-10 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Course Thumbnail</label>
                <div className="flex items-center space-x-8">
                  <div className="w-36 h-36 bg-slate-50 rounded-[32px] flex items-center justify-center overflow-hidden border-2 border-dashed border-slate-200 group relative">
                    {newCourse.image ? (
                      <img src={newCourse.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-slate-200" />
                    )}
                  </div>
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 px-8 py-4 rounded-2xl text-[13px] font-black transition-all flex items-center space-x-3 active:scale-95">
                    <Upload className="w-4 h-4" />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Course Title</label>
                <input 
                  type="text" 
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  className="w-full px-8 py-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold placeholder-slate-300 text-lg outline-none"
                  placeholder="e.g. Mastering Advanced AI Workflow"
                />
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Category</label>
                  <select 
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                    className="w-full px-8 py-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold outline-none cursor-pointer"
                  >
                    <option>Development</option>
                    <option>Design</option>
                    <option>Business</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Price ($)</label>
                  <input 
                    type="number" 
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: parseFloat(e.target.value)})}
                    className="w-full px-8 py-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10">
                 <div className="space-y-3">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Level</label>
                  <select 
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({...newCourse, level: e.target.value as any})}
                    className="w-full px-8 py-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold outline-none"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Initial Visibility</label>
                  <select 
                    value={newCourse.status}
                    onChange={(e) => setNewCourse({...newCourse, status: e.target.value as any})}
                    className="w-full px-8 py-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold outline-none"
                  >
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Description</label>
                  <button 
                    onClick={handleAiGenerate}
                    disabled={isAiLoading}
                    className="flex items-center space-x-2 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] hover:text-blue-800 disabled:opacity-50 transition-all group"
                  >
                    <Sparkles className={`w-4 h-4 ${isAiLoading ? 'animate-spin' : 'group-hover:rotate-12'}`} />
                    <span>{isAiLoading ? 'AI Thinking...' : 'Refine with AI'}</span>
                  </button>
                </div>
                <textarea 
                  rows={5}
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  className="w-full px-8 py-6 bg-slate-50 rounded-3xl border-none focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold placeholder-slate-300 leading-relaxed outline-none"
                  placeholder="Describe what students will learn..."
                ></textarea>
              </div>
            </div>

            <div className="px-12 py-10 bg-slate-50/50 flex items-center justify-end space-x-10 border-t border-slate-100">
              <button 
                onClick={closeModal}
                className="text-[13px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-[0.2em] active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="bg-[#2563eb] text-white px-14 py-5 rounded-[24px] font-black shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-[0.15em]"
              >
                {editingCourseId ? 'Save Changes' : 'Publish Course'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </AdminLayout>
  );
};

export default AdminCourses;
