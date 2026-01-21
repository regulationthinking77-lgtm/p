
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldAlert } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

interface AuthProps {
  onLogin: (email: string, isAdmin: boolean) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        // Updated admin email to diptoislam2006@gmail.com for consistency across the app
        const isAdmin = credential.user.email === 'diptoislam2006@gmail.com';
        if (isAdmin) navigate('/admin');
        else navigate('/');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/');
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid credentials. Please try again.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#131619] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[150px] rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full -ml-48 -mb-48"></div>

      <div className="bg-[#1a1d21] w-full max-w-md rounded-[40px] shadow-2xl border border-white/5 relative z-10 p-10 md:p-12">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-orange-500/10 rounded-3xl mb-6">
            <ShieldAlert className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2">
            {isLogin ? 'Sign In' : 'Join E-Online'}
          </h2>
          <p className="text-slate-500 font-medium">Access your learning dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full pl-14 pr-5 py-4 bg-white/5 rounded-2xl border border-white/5 text-white focus:ring-2 focus:ring-orange-500/50 outline-none transition-all font-medium disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-14 pr-5 py-4 bg-white/5 rounded-2xl border border-white/5 text-white focus:ring-2 focus:ring-orange-500/50 outline-none transition-all font-medium disabled:opacity-50"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full orange-gradient text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:scale-100"
          >
            <span>{loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}</span>
            {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 text-center">
          <button 
            disabled={loading}
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-500 font-bold hover:text-white transition-colors disabled:opacity-50"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
