import React from 'react';
import { useForm } from 'react-hook-form';

export default function StudentRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Successfully Registered Student Data:', data);
    alert(`Registration Successful!\n\nCheck the console for details.\n\nName: ${data.name}\nEmail: ${data.email}`);
    reset();
  };

  return (
    <div className="min-h-screen bg-radial from-[#1e1b4b] via-[#0f172a] to-[#020617] flex items-center justify-center p-6 text-white font-sans">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl transition-all duration-300 hover:border-white/20">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-2xl mb-4 shadow-lg shadow-rose-500/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
            Student Registration
          </h2>
          <p className="text-slate-400 text-sm mt-2">Create your academic profile to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="John Doe"
                className={`w-full px-4 py-3.5 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.name 
                    ? 'border-rose-500 focus:ring-rose-500/50' 
                    : 'border-white/10 focus:border-amber-500 focus:ring-amber-500/20'
                }`}
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 3, message: 'Name must be at least 3 characters' },
                  maxLength: { value: 50, message: 'Name cannot exceed 50 characters' },
                })}
              />
            </div>
            {errors.name && (
              <span className="text-rose-400 text-xs font-medium flex items-center gap-1 mt-1 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="johndoe@university.edu"
                className={`w-full px-4 py-3.5 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.email 
                    ? 'border-rose-500 focus:ring-rose-500/50' 
                    : 'border-white/10 focus:border-amber-500 focus:ring-amber-500/20'
                }`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Enter a valid email address',
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="text-rose-400 text-xs font-medium flex items-center gap-1 mt-1 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Mobile Number Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Mobile Number
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="9876543210"
                className={`w-full px-4 py-3.5 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.mobile 
                    ? 'border-rose-500 focus:ring-rose-500/50' 
                    : 'border-white/10 focus:border-amber-500 focus:ring-amber-500/20'
                }`}
                {...register('mobile', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Mobile number must be exactly 10 digits',
                  },
                })}
              />
            </div>
            {errors.mobile && (
              <span className="text-rose-400 text-xs font-medium flex items-center gap-1 mt-1 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                {errors.mobile.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3.5 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.password 
                    ? 'border-rose-500 focus:ring-rose-500/50' 
                    : 'border-white/10 focus:border-amber-500 focus:ring-amber-500/20'
                }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
              />
            </div>
            {errors.password && (
              <span className="text-rose-400 text-xs font-medium flex items-center gap-1 mt-1 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-rose-500/20 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Register Student</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
