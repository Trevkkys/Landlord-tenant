import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck, Camera, Check, FileText, User,
    BadgeCheck, FolderOpen, Lock, ChevronLeft,
    UploadCloud, Briefcase, Landmark, ChevronRight,
    Info, Lightbulb
} from 'lucide-react';

const FullPageKYC = ({ role = 'landlord' }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [gender, setGender] = useState('Male');
    const [empStatus, setEmpStatus] = useState('Employed');
    const [docType, setDocType] = useState('National ID (NIN)');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [selfieCapture, setSelfieCapture] = useState(false);

    const steps = ['Profile', 'Identity', 'Employment', 'Selfie', 'Review'];

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
        else setIsSubmitted(true);
    };

    if (isSubmitted) return <SuccessScreen />;

    return (
        <div className="min-h-screen w-full bg-[#f0fdf4] flex flex-col font-sans text-[#064e3b] overflow-x-hidden">
            {/* Top Stepper */}
            <header className="relative z-10 w-full px-6 py-10 md:px-20 border-b border-emerald-100 bg-white/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {steps.map((label, i) => (
                        <div key={i} className="flex flex-col items-center flex-1 relative">
                            {i < steps.length - 1 && (
                                <div className="absolute top-6 left-[50%] w-full h-[2px] bg-emerald-100 hidden md:block">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: i < currentStep ? '100%' : '0%' }}
                                        className="h-full bg-emerald-500"
                                    />
                                </div>
                            )}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 z-10 border-2 ${i <= currentStep
                                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200'
                                    : 'bg-white border-emerald-100 text-emerald-200'
                                }`}>
                                {i < currentStep ? <Check size={24} strokeWidth={3} /> : i + 1}
                            </div>
                            <p className={`mt-3 text-xs font-black uppercase tracking-widest hidden md:block ${i <= currentStep ? 'text-emerald-600' : 'text-emerald-200'}`}>
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 w-full flex flex-col items-center py-12 px-6 md:px-20">
                <div className="w-full max-w-5xl flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="w-full"
                        >
                            {currentStep === 0 && <StepOne gender={gender} setGender={setGender} />}
                            {currentStep === 1 && <StepTwo docType={docType} setDocType={setDocType} role={role} />}
                            {currentStep === 2 && <StepThree empStatus={empStatus} setEmpStatus={setEmpStatus} />}
                            {currentStep === 3 && <StepFour setSelfieCapture={setSelfieCapture} selfieCapture={selfieCapture} />}
                            {currentStep === 4 && <StepFive agreedToTerms={agreedToTerms} setAgreedToTerms={setAgreedToTerms} gender={gender} docType={docType} empStatus={empStatus} />}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Navigation */}
                <footer className="w-full max-w-5xl mt-auto pt-12 flex items-center justify-between border-t border-emerald-100">
                    <button
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        className={`flex items-center gap-2 font-bold text-emerald-600 transition-all ${currentStep === 0 ? 'opacity-0' : 'hover:translate-x-1'}`}
                    >
                        <ChevronLeft size={20} /> Previous
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentStep === 4 && !agreedToTerms}
                        className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-200 text-white py-5 px-12 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-95"
                    >
                        {currentStep === 4 ? 'Complete Submission' : 'Next Step'}
                        <ChevronRight size={22} />
                    </button>
                </footer>
            </main>
        </div>
    );
};

// --- STEP COMPONENTS ---

const StepOne = ({ gender, setGender }) => (
    <div className="space-y-10">
        <div>
            <h1 className="text-5xl font-black text-[#064e3b] tracking-tight">Personal <span className="text-emerald-500">Profile</span></h1>
            <p className="text-emerald-600/70 text-lg mt-2 font-medium">Let's get your basic details sorted.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-black text-emerald-800 uppercase tracking-widest">Gender</label>
                <div className="flex gap-4">
                    {['Male', 'Female'].map(g => (
                        <button
                            key={g}
                            onClick={() => setGender(g)}
                            className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all border-2 ${gender === g ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-white border-emerald-100 text-emerald-600 hover:border-emerald-300'}`}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </div>
            <PlainInput label="Legal First Name" placeholder="e.g. Tunde" />
            <PlainInput label="Legal Last Name" placeholder="e.g. Adeola" />
            <PlainInput label="Nationality" placeholder="e.g. Nigerian" />
            <PlainInput label="Phone Number" placeholder="+234..." />
            <div className="md:col-span-2">
                <PlainInput label="Full Residential Address" placeholder="Street, City, State" />
            </div>
        </div>
    </div>
);

const StepTwo = ({ docType, setDocType, role }) => (
    <div className="space-y-10">
        <h1 className="text-5xl font-black text-[#064e3b] tracking-tight">Identity <span className="text-emerald-500">Document</span></h1>
        <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
                {['National ID (NIN)', 'International Passport', 'Driver’s License'].map(type => (
                    <div
                        key={type}
                        onClick={() => setDocType(type)}
                        className={`p-6 bg-white border-2 rounded-[2rem] cursor-pointer transition-all flex justify-between items-center ${docType === type ? 'border-emerald-500 shadow-md' : 'border-emerald-50 hover:border-emerald-200'}`}
                    >
                        <span className="font-bold text-lg">{type}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${docType === type ? 'border-emerald-500 bg-emerald-500' : 'border-emerald-100'}`}>
                            {docType === type && <Check size={14} className="text-white" />}
                        </div>
                    </div>
                ))}
                <div className="pt-4">
                    <PlainInput label={`${docType} Number`} placeholder={`Enter your ${docType} ID number`} />
                </div>
            </div>
            <div className="space-y-6">
                <div className="grid gap-4">
                    <WhiteUpload label="Front View Photo" />
                    <WhiteUpload label="Back View Photo" />
                    {role === 'landlord' && <WhiteUpload label="Proof of Ownership (C of O)" />}
                </div>
            </div>
        </div>
    </div>
);

const StepThree = ({ empStatus, setEmpStatus }) => (
    <div className="space-y-10">
        <h1 className="text-5xl font-black text-[#064e3b] tracking-tight">Employment <span className="text-emerald-500">& Income</span></h1>
        <div className="space-y-8 max-w-3xl">
            <div className="space-y-4">
                <label className="text-xs font-black text-emerald-800 uppercase tracking-widest">Employment Status</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Employed', 'Self-Employed', 'Student', 'Other'].map(s => (
                        <button
                            key={s}
                            onClick={() => setEmpStatus(s)}
                            className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${empStatus === s ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-emerald-50 text-emerald-600 hover:border-emerald-300'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <PlainInput label="Employer / Company Name" placeholder="e.g. Google Inc" />
                <PlainInput label="Job Title / Role" placeholder="e.g. Product Designer" />
            </div>
            <div className="space-y-4">
                <label className="text-xs font-black text-emerald-800 uppercase tracking-widest">Estimated Monthly Income</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['< 250k', '250k - 750k', '750k - 1.5M', '1.5M+'].map(r => (
                        <button key={r} className="py-4 bg-white border-2 border-emerald-50 rounded-2xl font-black text-sm hover:border-emerald-500 transition-all">₦{r}</button>
                    ))}
                </div>
            </div>
            <WhiteUpload icon={<Landmark size={24} />} label="Upload 6-Months Bank Statement" />
        </div>
    </div>
);

const StepFour = ({ selfieCapture, setSelfieCapture }) => (
    <div className="space-y-10">
        <h1 className="text-5xl font-black text-[#064e3b] tracking-tight">Face <span className="text-emerald-500">Capture</span></h1>
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
                onClick={() => setSelfieCapture(!selfieCapture)}
                className="aspect-square bg-white border-4 border-dashed border-emerald-100 rounded-[3rem] flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 transition-all relative overflow-hidden"
            >
                {selfieCapture ? (
                    <div className="absolute inset-0 bg-emerald-500 flex items-center justify-center text-white"><Check size={80} strokeWidth={3} /></div>
                ) : (
                    <>
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4"><Camera size={40} /></div>
                        <p className="font-black text-xl">Open Camera</p>
                    </>
                )}
            </div>
            <div className="space-y-6">
                <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100">
                    <div className="flex items-center gap-3 text-emerald-700 mb-4 font-black uppercase text-xs tracking-widest">
                        <Lightbulb size={18} /> Tips for a perfect selfie
                    </div>
                    <ul className="space-y-4 text-emerald-800/70 font-medium">
                        <li className="flex gap-3"><Check size={16} className="text-emerald-500 mt-1" /> Ensure your face is within the oval frame</li>
                        <li className="flex gap-3"><Check size={16} className="text-emerald-500 mt-1" /> Find a spot with good, natural lighting</li>
                        <li className="flex gap-3"><Check size={16} className="text-emerald-500 mt-1" /> Remove glasses, hats, or face masks</li>
                        <li className="flex gap-3"><Check size={16} className="text-emerald-500 mt-1" /> Keep a neutral expression</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

const StepFive = ({ agreedToTerms, setAgreedToTerms, gender, docType, empStatus }) => (
    <div className="space-y-10">
        <h1 className="text-5xl font-black text-[#064e3b] tracking-tight">Final <span className="text-emerald-500">Review</span></h1>
        <div className="grid md:grid-cols-2 gap-6">
            <SummaryBlock title="Personal Information" items={{ "Gender": gender, "Nationality": "Nigerian", "Phone": "+234 800..." }} />
            <SummaryBlock title="Identity Verification" items={{ "Document": docType, "ID Number": "2234XXXX90", "Photos": "2 Uploaded" }} />
            <SummaryBlock title="Employment Info" items={{ "Status": empStatus, "Role": "Senior Manager", "Income": "750k - 1.5M" }} />
            <SummaryBlock title="Verification" items={{ "Selfie": "Captured Successfully", "Face Match": "Verified" }} />
        </div>
        <label className="flex items-start gap-5 p-8 bg-white rounded-[2rem] border-2 border-emerald-100 cursor-pointer group mt-8">
            <input type="checkbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} className="w-8 h-8 rounded-xl accent-emerald-500 mt-1" />
            <p className="text-lg font-bold text-emerald-800 group-hover:text-emerald-600 transition-colors">
                I certify that all provided data is true and accurate. I authorize RentSafe to verify my identity and employment details.
            </p>
        </label>
    </div>
);

// --- REUSABLE UI ELEMENTS ---

const PlainInput = ({ label, placeholder }) => (
    <div className="space-y-2">
        <label className="text-xs font-black text-emerald-800 uppercase tracking-widest">{label}</label>
        <input
            className="w-full bg-white border-2 border-emerald-50 rounded-2xl p-5 text-lg font-bold text-emerald-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
            placeholder={placeholder}
        />
    </div>
);

const WhiteUpload = ({ label, icon = <UploadCloud size={24} /> }) => (
    <div className="group w-full p-6 bg-white border-2 border-dashed border-emerald-100 rounded-[2rem] flex items-center justify-between hover:border-emerald-500 transition-all cursor-pointer">
        <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                {icon}
            </div>
            <span className="text-lg font-bold text-emerald-900">{label}</span>
        </div>
        <span className="text-[10px] font-black text-emerald-200 uppercase tracking-widest group-hover:text-emerald-500">Attach</span>
    </div>
);

const SummaryBlock = ({ title, items }) => (
    <div className="p-8 bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm">
        <h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-6">{title}</h3>
        <div className="space-y-3">
            {Object.entries(items).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center py-1">
                    <span className="text-emerald-800/40 font-bold text-sm uppercase italic">{key}</span>
                    <span className="text-emerald-900 font-black">{val}</span>
                </div>
            ))}
        </div>
    </div>
);

const SuccessScreen = () => (
    <div className="min-h-screen bg-emerald-600 flex items-center justify-center p-10 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8 text-white">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <ShieldCheck size={70} className="text-emerald-600" />
            </div>
            <h1 className="text-7xl font-black italic tracking-tighter">VERIFIED!</h1>
            <p className="text-emerald-50 text-xl max-w-md mx-auto font-medium opacity-80">
                Your verification request is currently being processed by our compliance team.
            </p>
            <button className="mt-10 py-5 px-16 bg-white text-emerald-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl">
                Continue to Profile
            </button>
        </motion.div>
    </div>
);

export default FullPageKYC;