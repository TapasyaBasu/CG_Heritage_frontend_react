import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function StudentAdmissionForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      username: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  // Steps Configuration
  const steps = [
    { number: 1, label: 'Personal Info' },
    { number: 2, label: 'Contact Details' },
    { number: 3, label: 'Account Setup' },
    { number: 4, label: 'Review & Submit' },
  ];

  // Validate the current step fields before going forward
  const nextStep = async () => {
    let fieldsToValidate = [];
    if (currentStep === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'dob', 'gender'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['email', 'phone', 'address', 'city'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['username', 'password', 'confirmPassword'];
    }

    const isValid = await trigger(fieldsToValidate);
    
    // Additional custom validation for passwords matching on Step 3
    if (currentStep === 3 && isValid) {
      const values = getValues();
      if (values.password !== values.confirmPassword) {
        // We'll let the standard validation or error rendering handle it if we register it properly
        return;
      }
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (data) => {
    console.log('Successfully Submitted Student Admission Data:', data);
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  const handleRestart = () => {
    reset();
    setCurrentStep(1);
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  const values = getValues();

  return (
    <div className="min-h-screen bg-radial from-[#0f172a] via-[#020617] to-[#000] flex items-center justify-center p-6 text-white font-sans">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl transition-all duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
            Student Admission Form
          </h2>
          <p className="text-slate-400 text-sm mt-1">Complete the four steps to submit your application</p>
        </div>

        {/* Step Progress Bar */}
        <div className="mb-10 px-4">
          <div className="flex items-center justify-between relative">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/10 z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 z-0"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>

            {/* Step badges */}
            {steps.map((step) => {
              const isActive = step.number === currentStep;
              const isCompleted = step.number < currentStep || isSubmitted;

              return (
                <div key={step.number} className="flex flex-col items-center z-10 relative">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' 
                        : isActive
                          ? 'bg-slate-900 border-teal-400 text-teal-400 ring-4 ring-teal-400/20'
                          : 'bg-slate-950 border-white/15 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mt-2.5 transition-colors duration-200 ${
                    isActive ? 'text-teal-400' : isCompleted ? 'text-emerald-400' : 'text-slate-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* STEP 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="text-lg font-bold text-teal-400 border-b border-white/5 pb-2">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">First Name</label>
                    <input
                      type="text"
                      placeholder="Jane"
                      className={`w-full px-4 py-3 bg-slate-950/60 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.firstName ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:border-teal-500 focus:ring-teal-500/20'
                      }`}
                      {...register('firstName', {
                        required: 'First name is required',
                        minLength: { value: 2, message: 'Must be at least 2 characters' }
                      })}
                    />
                    {errors.firstName && <span className="text-rose-400 text-xs mt-1 font-medium">{errors.firstName.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className={`w-full px-4 py-3 bg-slate-950/60 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.lastName ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:border-teal-500 focus:ring-teal-500/20'
                      }`}
                      {...register('lastName', {
                        required: 'Last name is required',
                        minLength: { value: 2, message: 'Must be at least 2 characters' }
                      })}
                    />
                    {errors.lastName && <span className="text-rose-400 text-xs mt-1 font-medium">{errors.lastName.message}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Date of Birth</label>
                    <input
                      type="date"
                      className={`w-full px-4 py-3 bg-slate-950/60 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.dob ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:border-teal-500 focus:ring-teal-500/20'
                      }`}
                      {...register('dob', { required: 'Date of birth is required' })}
                    />
                    {errors.dob && <span className="text-rose-400 text-xs mt-1 font-medium">{errors.dob.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Gender</label>
                    <select
                      className={`w-full px-4 py-3 bg-slate-950/60 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.gender ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:border-teal-500 focus:ring-teal-500/20'
                      }`}
                      {...register('gender', { required: 'Please select your gender' })}
                    >
                      <option value="" className="bg-slate-950">Select Gender</option>
                      <option value="Male" className="bg-slate-950">Male</option>
                      <option value="Female" className="bg-slate-950">Female</option>
                      <option value="Other" className="bg-slate-950">Other</option>
                    </select>
                    {errors.gender && <span className="text-rose-400 text-xs mt-1 font-medium">{errors.gender.message}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Contact Details */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="text-lg font-bold text-teal-400 border-b border-white/5 pb-2">Contact Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Email Address</label>
                    <input
                      type="email"
                      placeholder="jane.doe@example.com"
                      className={`w-full px-4 py-3 bg-slate-950/60 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.email ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:border-teal-500 focus:ring-teal-500/20'
                      }`}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    {errors.email && <span className="text-rose-400 text-xs mt-1 font-medium">{errors.email.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      className={`w-full px-4 py-3 bg-slate-950/60 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.phone ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:border-teal-500 focus:ring-teal-500/20'
                      }`}
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Must be a 10-digit number'
                        }
                      })}
                    />
                    {errors.phone && <span className="text-rose-400 text-xs mt-1 font-medium">{errors.phone.message}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Residential Address</label>
                  <input
                    type="text"
                    placeholder="123 Main St, Apartment 4B"
                    className={`w-full px-4 py-3 bg-slate-950/60 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.address ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:border-teal-500 focus:ring-teal-500/20'
                    }`}
                    {...register('address', { required: 'Address is required' })}
                  />
                  {errors.address && <span className="text-rose-400 text-xs mt-1 font-medium">{errors.address.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">City</label>
                  <input
                    type="text"
                    placeholder="Boston"
                    className={`w-full px-4 py-3 bg-slate-950/60 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.city ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:border-teal-500 focus:ring-teal-500/20'
                    }`}
                    {...register('city', { required: 'City is required' })}
                  />
                  {errors.city && <span className="text-rose-400 text-xs mt-1 font-medium">{errors.city.message}</span>}
                </div>
              </div>
            )}

            {/* STEP 3: Account Setup */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="text-lg font-bold text-teal-400 border-b border-white/5 pb-2">Account Setup</h3>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Username</label>
                  <input
                    type="text"
                    placeholder="janedoe99"
                    className={`w-full px-4 py-3 bg-slate-950/60 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.username ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:border-teal-500 focus:ring-teal-500/20'
                    }`}
                    {...register('username', {
                      required: 'Username is required',
                      minLength: { value: 4, message: 'Must be at least 4 characters' },
                      pattern: {
                        value: /^\S+$/,
                        message: 'Username cannot contain spaces'
                      }
                    })}
                  />
                  {errors.username && <span className="text-rose-400 text-xs mt-1 font-medium">{errors.username.message}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 bg-slate-950/60 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.password ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:border-teal-500 focus:ring-teal-500/20'
                      }`}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                      })}
                    />
                    {errors.password && <span className="text-rose-400 text-xs mt-1 font-medium">{errors.password.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 bg-slate-950/60 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.confirmPassword ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:border-teal-500 focus:ring-teal-500/20'
                      }`}
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (val) => {
                          if (val !== values.password) {
                            return 'Passwords do not match';
                          }
                        }
                      })}
                    />
                    {errors.confirmPassword && <span className="text-rose-400 text-xs mt-1 font-medium">{errors.confirmPassword.message}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-bold text-teal-400 border-b border-white/5 pb-2">Review & Submit</h3>
                
                {/* Form Summaries */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-white/5 p-5 rounded-2xl border border-white/10">
                  <div>
                    <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">Personal Details</h4>
                    <p className="text-slate-300"><span className="text-slate-500">Name:</span> {values.firstName} {values.lastName}</p>
                    <p className="text-slate-300"><span className="text-slate-500">DOB:</span> {values.dob}</p>
                    <p className="text-slate-300"><span className="text-slate-500">Gender:</span> {values.gender}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">Contact Details</h4>
                    <p className="text-slate-300"><span className="text-slate-500">Email:</span> {values.email}</p>
                    <p className="text-slate-300"><span className="text-slate-500">Phone:</span> {values.phone}</p>
                    <p className="text-slate-300"><span className="text-slate-500">Address:</span> {values.address}, {values.city}</p>
                  </div>
                  <div className="md:col-span-2 border-t border-white/5 pt-3 mt-1">
                    <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">Account Details</h4>
                    <p className="text-slate-300"><span className="text-slate-500">Username:</span> {values.username}</p>
                  </div>
                </div>

                {/* Consent checkbox */}
                <div className="flex flex-col gap-1.5 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded text-teal-500 focus:ring-teal-500/30 bg-slate-900 border-white/10"
                      {...register('agreeTerms', { required: 'You must agree to the terms to submit your application' })}
                    />
                    <span className="text-xs text-slate-300 leading-normal">
                      I declare that all the details filled above are true to the best of my knowledge. I agree to comply with the rules and guidelines of the institution.
                    </span>
                  </label>
                  {errors.agreeTerms && <span className="text-rose-400 text-xs mt-1 font-medium">{errors.agreeTerms.message}</span>}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-4">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                  currentStep === 1
                    ? 'opacity-40 cursor-not-allowed text-slate-500 bg-white/5'
                    : 'bg-white/10 hover:bg-white/15 text-white active:scale-95'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back</span>
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 active:scale-95 font-bold rounded-xl text-sm transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/10"
                >
                  <span>Next Step</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold rounded-xl text-sm active:scale-95 transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <span>Submit Admission</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              )}
            </div>

          </form>
        ) : (
          /* SUCCESS STATE */
          <div className="space-y-6 text-center py-8 animate-fade-in">
            <div className="inline-flex p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-full mb-4 text-emerald-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-emerald-400">Admission Submitted!</h3>
              <p className="text-slate-400 text-sm mt-2">
                Thank you, <span className="text-white font-medium">{submittedData?.firstName}</span>. Your application was successfully completed.
              </p>
            </div>

            <div className="max-w-md mx-auto bg-white/5 border border-white/10 p-5 rounded-2xl text-left text-xs space-y-2 mt-6">
              <p className="text-slate-400 border-b border-white/5 pb-2 mb-2 font-bold text-center text-sm tracking-wider uppercase">Application Snapshot</p>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <p><span className="text-slate-500">Applicant:</span> {submittedData?.firstName} {submittedData?.lastName}</p>
                <p><span className="text-slate-500">Email:</span> {submittedData?.email}</p>
                <p><span className="text-slate-500">Phone:</span> {submittedData?.phone}</p>
                <p><span className="text-slate-500">City:</span> {submittedData?.city}</p>
                <p className="col-span-2"><span className="text-slate-500">Username Created:</span> {submittedData?.username}</p>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="mt-6 px-6 py-3 bg-white/10 hover:bg-white/15 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all duration-150 cursor-pointer"
            >
              Submit Another Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
