import React, { useState } from 'react';
import { 
  Heart, Phone, Mail, ShieldCheck, AlertCircle, ArrowRight, 
  CheckCircle2, Sparkles, X, User
} from 'lucide-react';
import { CurrentUser, Gender, SeekingGender, RelationshipMode } from '../../types';
import { INDIAN_CITIES } from '../../data/mockProfiles';
import { playSound } from '../../utils/audio';

interface AuthModalProps {
  onCompleteAuth: (user: CurrentUser) => void;
  onClose?: () => void;
  isInitial?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onCompleteAuth,
  onClose,
  isInitial = false
}) => {
  const [step, setStep] = useState<'methods' | 'phone_otp' | 'email' | 'age_check' | 'profile_setup'>('methods');
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('2001-08-15');
  const [ageError, setAgeError] = useState('');

  // Profile setup fields
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [seeking, setSeeking] = useState<SeekingGender>('female');
  const [city, setCity] = useState('Mumbai');
  const [mode, setMode] = useState<RelationshipMode>('dating');

  const calculateAge = (dobString: string): number => {
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleVerifyAge = () => {
    const age = calculateAge(dob);
    if (age < 18) {
      setAgeError('Under Indian law and DilSe safety guidelines, you must be at least 18 years old to join.');
      return;
    }
    setAgeError('');
    setStep('profile_setup');
  };

  const handleGoogleLogin = () => {
    playSound('match');
    const demoUser: CurrentUser = {
      id: 'google_user_' + Date.now(),
      name: 'Aditi Rao',
      email: 'aditi.rao@gmail.com',
      age: 23,
      dob: '2003-05-12',
      gender: 'female',
      seeking: 'male',
      city: 'Bengaluru',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
      ],
      bio: 'Coffee lover, UX designer, and indie music enthusiast. Exploring the best rooftop spots in Indiranagar.',
      profession: 'UI/UX Product Designer',
      languages: ['English', 'Hindi', 'Kannada'],
      hobbies: ['Coffee', 'Design', 'Live Music', 'Trekking'],
      relationshipMode: 'dating',
      foodPreference: 'Eggetarian',
      drinking: 'Socially',
      smoking: 'Never',
      prompts: [
        {
          question: 'Best way to spend Sunday in Bengaluru',
          answer: 'Cubbon park morning walk followed by breakfast dosa at CTR.'
        }
      ],
      isVerified: true,
      subscription: 'free',
      superLikesRemaining: 3,
      rewindsRemaining: 5,
      isAgeVerified: true
    };
    onCompleteAuth(demoUser);
  };

  const handleFinishProfileSetup = () => {
    const age = calculateAge(dob);
    const newUser: CurrentUser = {
      id: 'user_' + Date.now(),
      name: name || (gender === 'male' ? 'Aryan Kapoor' : 'Ananya Sharma'),
      phone: `+91 ${phone}`,
      email: email || undefined,
      age: age || 24,
      dob,
      gender,
      seeking,
      city,
      avatar: gender === 'male'
        ? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      photos: [
        gender === 'male'
          ? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
      ],
      bio: `Living in ${city}. Looking forward to meeting genuine people Dil Se!`,
      profession: 'Professional',
      languages: ['Hindi', 'English'],
      hobbies: ['Chai Lover', 'Bollywood', 'Travel & Roadtrips'],
      relationshipMode: mode,
      foodPreference: 'Vegetarian',
      drinking: 'Socially',
      smoking: 'Never',
      prompts: [
        {
          question: `My favorite spot in ${city}`,
          answer: 'Finding quiet chai tapris and vibrant evening street food.'
        }
      ],
      isVerified: true,
      subscription: 'free',
      superLikesRemaining: 3,
      rewindsRemaining: 5,
      isAgeVerified: true
    };
    playSound('match');
    onCompleteAuth(newUser);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-white border border-pink-100 shadow-2xl p-6 text-gray-800">
        {onClose && !isInitial && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Brand Logo & Heading */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-2.5 shadow-lg shadow-pink-500/25">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent">
            DILMILENGE
          </h2>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            दिल मिलेंगे • Indian Dating & Friendship • 18+ Only
          </p>
        </div>

        {/* Step 1: Sign Up / Login Options */}
        {step === 'methods' && (
          <div className="space-y-3">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs flex items-center justify-center gap-2.5 shadow-xs transition-all active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Phone OTP */}
            <button
              onClick={() => setStep('phone_otp')}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 hover:brightness-105 active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Login with Indian Mobile Number (+91)</span>
            </button>

            {/* Email */}
            <button
              onClick={() => setStep('email')}
              className="w-full py-3 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Continue with Email</span>
            </button>

            <div className="pt-2 text-center text-[10px] text-gray-400 leading-snug">
              By joining DilSe, you confirm you are 18+ and agree to our Safe Dating India guidelines & verified terms.
            </div>
          </div>
        )}

        {/* Step 2A: Phone OTP Screen */}
        {step === 'phone_otp' && (
          <div className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Enter Mobile Number
              </label>
              <div className="flex rounded-2xl border border-gray-200 overflow-hidden focus-within:border-pink-500">
                <span className="bg-gray-100 px-3 py-2 text-xs font-bold text-gray-600 flex items-center">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3 py-2 text-xs font-semibold focus:outline-none"
                  placeholder="98765 43210"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">Enter OTP Code</label>
                <span className="text-[10px] text-pink-600 font-semibold cursor-pointer">
                  Auto-filled: 8842
                </span>
              </div>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="Enter 4 or 6 digit OTP"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 text-center tracking-widest font-mono font-bold focus:border-pink-500 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setStep('age_check')}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-md shadow-pink-500/25 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Verify & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setStep('methods')}
              className="w-full text-center text-xs text-gray-400 hover:text-gray-600 font-medium"
            >
              ← Choose another login option
            </button>
          </div>
        )}

        {/* Step 2B: Email Login Screen */}
        {step === 'email' && (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setStep('age_check')}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all"
            >
              Sign In / Continue
            </button>

            <button
              onClick={() => setStep('methods')}
              className="w-full text-center text-xs text-gray-400 hover:text-gray-600 font-medium"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Step 3: Age Verification (Strictly 18+) */}
        {step === 'age_check' && (
          <div className="space-y-3.5">
            <div className="p-3 rounded-2xl bg-pink-50 border border-pink-200 text-xs text-pink-900 leading-snug flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-pink-950 font-bold">18+ Age Verification</strong>
                DilSe strictly prohibits minors. Please provide your actual Date of Birth as on Aadhaar or Govt ID.
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Your Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={e => {
                  setDob(e.target.value);
                  setAgeError('');
                }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none font-semibold text-gray-800"
              />
              <span className="text-[11px] text-gray-500 mt-1 block">
                Age: {calculateAge(dob)} years old
              </span>
            </div>

            {ageError && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{ageError}</span>
              </div>
            )}

            <button
              onClick={handleVerifyAge}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>I Confirm I Am 18+ →</span>
            </button>
          </div>
        )}

        {/* Step 4: Quick Profile Setup */}
        {step === 'profile_setup' && (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Your First Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Aryan, Ananya, Kabir"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">I am a</label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value as Gender)}
                  className="w-full px-2.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none bg-white font-medium"
                >
                  <option value="male">Boy / Man</option>
                  <option value="female">Girl / Woman</option>
                  <option value="non-binary">Non-Binary</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Looking for</label>
                <select
                  value={seeking}
                  onChange={e => setSeeking(e.target.value as SeekingGender)}
                  className="w-full px-2.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none bg-white font-medium"
                >
                  <option value="female">Girls</option>
                  <option value="male">Boys</option>
                  <option value="everyone">Everyone</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">City in India</label>
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full px-2.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none bg-white font-medium"
              >
                {INDIAN_CITIES.filter(c => c !== 'All Cities').map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Looking to find</label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setMode('dating')}
                  className={`py-1.5 rounded-xl text-center font-bold text-[11px] border ${
                    mode === 'dating' ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  💖 Dating
                </button>
                <button
                  type="button"
                  onClick={() => setMode('friendship')}
                  className={`py-1.5 rounded-xl text-center font-bold text-[11px] border ${
                    mode === 'friendship' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  🤝 Yaari
                </button>
                <button
                  type="button"
                  onClick={() => setMode('serious')}
                  className={`py-1.5 rounded-xl text-center font-bold text-[11px] border ${
                    mode === 'serious' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  💍 Serious
                </button>
              </div>
            </div>

            <button
              onClick={handleFinishProfileSetup}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-xs shadow-lg shadow-pink-500/25 hover:brightness-105 active:scale-95 transition-all mt-2"
            >
              Start Discovering Matches Dil Se! 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
