import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation Schema using Yup
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Full Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: yup
    .string()
    .required('Email address is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export default function RegistrationFormYup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data) => {
    // Exclude confirmPassword from logged data for cleaner output
    const { confirmPassword, ...submittedData } = data;
    console.log('Successfully Registered User Data (Yup Validated):', submittedData);
    alert(`Registration Successful with Yup!\n\nCheck the console for details.\n\nName: ${data.name}`);
    reset();
  };

  return (
    <div className="min-h-screen bg-radial from-[#1e1b4b] via-[#090514] to-[#02010a] flex items-center justify-center p-6 text-white font-sans">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl transition-all duration-300 hover:border-white/20">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-2xl mb-4 shadow-lg shadow-fuchsia-500/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Secure Signup
          </h2>
          <p className="text-slate-400 text-sm mt-2">Yup & React Hook Form Integration</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Alice Smith"
              className={`w-full px-4 py-3.5 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.name 
                  ? 'border-rose-500 focus:ring-rose-500/50' 
                  : 'border-white/10 focus:border-violet-500 focus:ring-violet-500/20'
              }`}
              {...register('name')}
            />
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
            <input
              type="email"
              placeholder="alice@domain.com"
              className={`w-full px-4 py-3.5 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.email 
                  ? 'border-rose-500 focus:ring-rose-500/50' 
                  : 'border-white/10 focus:border-violet-500 focus:ring-violet-500/20'
              }`}
              {...register('email')}
            />
            {errors.email && (
              <span className="text-rose-400 text-xs font-medium flex items-center gap-1 mt-1 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3.5 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.password 
                  ? 'border-rose-500 focus:ring-rose-500/50' 
                  : 'border-white/10 focus:border-violet-500 focus:ring-violet-500/20'
              }`}
              {...register('password')}
            />
            {errors.password && (
              <span className="text-rose-400 text-xs font-medium flex items-center gap-1 mt-1 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3.5 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.confirmPassword 
                  ? 'border-rose-500 focus:ring-rose-500/50' 
                  : 'border-white/10 focus:border-violet-500 focus:ring-violet-500/20'
              }`}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span className="text-rose-400 text-xs font-medium flex items-center gap-1 mt-1 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-3 py-3.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-fuchsia-500/20 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Create Account</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
