import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, PhoneCall, CheckCircle2, 
  Camera, Lock, EyeOff, UserX, ChevronRight, X, Sparkles
} from 'lucide-react';
import { CurrentUser } from '../../types';
import { getBlockedIds } from '../../utils/storage';
import { playSound } from '../../utils/audio';

interface SafetyCenterModalProps {
  currentUser: CurrentUser;
  onUpdateVerification: (isVerified: boolean) => void;
  onClose: () => void;
}

export const SafetyCenterModal: React.FC<SafetyCenterModalProps> = ({
  currentUser,
  onUpdateVerification,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'guidelines' | 'helplines' | 'verification' | 'blocked'>('guidelines');
  const [isCapturingSelfie, setIsCapturingSelfie] = useState(false);
  const [selfieSuccess, setSelfieSuccess] = useState(false);
  const blockedCount = getBlockedIds().length;

  const handleStartSelfieVerification = () => {
    setIsCapturingSelfie(true);
    setTimeout(() => {
      setIsCapturingSelfie(false);
      setSelfieSuccess(true);
      playSound('match');
      onUpdateVerification(true);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white border border-pink-100 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight flex items-center gap-1.5">
                <span>Suraksha Kendra</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-semibold">18+</span>
              </h3>
              <p className="text-xs text-emerald-100 font-medium">Safe Dating India & Trust Center</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center border-b border-gray-100 bg-gray-50/80 text-xs px-2 pt-2">
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`flex-1 py-2 font-semibold border-b-2 transition-all ${
              activeTab === 'guidelines'
                ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-xl'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Guidelines
          </button>
          <button
            onClick={() => setActiveTab('helplines')}
            className={`flex-1 py-2 font-semibold border-b-2 transition-all ${
              activeTab === 'helplines'
                ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-xl'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Helplines (112)
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`flex-1 py-2 font-semibold border-b-2 transition-all ${
              activeTab === 'verification'
                ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-xl'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Verification
          </button>
          <button
            onClick={() => setActiveTab('blocked')}
            className={`flex-1 py-2 font-semibold border-b-2 transition-all ${
              activeTab === 'blocked'
                ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-xl'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Blocked ({blockedCount})
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-gray-700 text-xs">
          {activeTab === 'guidelines' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900 leading-relaxed">
                <h4 className="font-bold text-xs flex items-center gap-1.5 text-emerald-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>The DILMILENGE Safe Dating Code in India</span>
                </h4>
                DILMILENGE is exclusively built for consenting adults aged 18 and older. We enforce zero-tolerance for harassment, fake accounts, scamming, or non-consensual behavior.
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Always meet in public places</h5>
                    <p className="text-gray-500 mt-0.5 leading-snug">
                      Plan first dates at bustling cafes like Starbucks, CCD, or popular shopping malls. Never meet at secluded or private accommodations.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Share your live location with a friend</h5>
                    <p className="text-gray-500 mt-0.5 leading-snug">
                      Always let a trusted family member or best friend know where you are going, who you are meeting, and share your WhatsApp live location.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Never send money or UPI payments</h5>
                    <p className="text-gray-500 mt-0.5 leading-snug">
                      Scammers often create sob stories requesting money, medical emergencies, or crypto. Real matches will never ask you for money or OTPs.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 font-bold text-xs">
                    4
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Video call before meeting in person</h5>
                    <p className="text-gray-500 mt-0.5 leading-snug">
                      Use DilSe's built-in 1-on-1 video call feature to verify identity and confirm the person matches their profile photos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'helplines' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500">
                Official Government of India emergency numbers available 24/7 across all states & union territories:
              </p>

              {/* 112 National Emergency */}
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-rose-900 text-sm">National Emergency: 112</h4>
                  <p className="text-[11px] text-rose-700 mt-0.5">
                    Unified 24x7 all-India police, fire & ambulance helpline
                  </p>
                </div>
                <a
                  href="tel:112"
                  className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-xs hover:bg-rose-700 flex items-center gap-1 shrink-0"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call 112</span>
                </a>
              </div>

              {/* 1091 Women Safety Helpline */}
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-purple-900 text-sm">Women Safety Helpline: 1091</h4>
                  <p className="text-[11px] text-purple-700 mt-0.5">
                    National Commission for Women & Women Police Cell
                  </p>
                </div>
                <a
                  href="tel:1091"
                  className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-xs hover:bg-purple-700 flex items-center gap-1 shrink-0"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call 1091</span>
                </a>
              </div>

              {/* 1930 National Cyber Crime */}
              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sky-900 text-sm">Cyber Crime Helpline: 1930</h4>
                  <p className="text-[11px] text-sky-700 mt-0.5">
                    Report financial fraud, impersonation & online blackmail
                  </p>
                </div>
                <a
                  href="tel:1930"
                  className="px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-xs hover:bg-sky-700 flex items-center gap-1 shrink-0"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call 1930</span>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-600 mx-auto flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-9 h-9" />
              </div>

              <div>
                <h4 className="font-bold text-base text-gray-900">
                  {currentUser.isVerified ? 'Your Profile is Verified!' : 'Get the Blue Shield Badge'}
                </h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1 leading-relaxed">
                  Verified profiles receive 3x more matches in India. We perform a quick 3D selfie pose check to ensure you are the real person in your photos.
                </p>
              </div>

              {isCapturingSelfie ? (
                <div className="p-6 rounded-2xl bg-gray-900 text-white flex flex-col items-center justify-center space-y-3">
                  <div className="w-20 h-20 rounded-full border-4 border-dashed border-emerald-400 animate-spin flex items-center justify-center">
                    <Camera className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-xs font-semibold text-emerald-300 animate-pulse">
                    Scanning live face angle... Please look straight.
                  </p>
                </div>
              ) : selfieSuccess || currentUser.isVerified ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <div className="flex items-center justify-center gap-1.5 font-bold text-sm text-emerald-900">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Selfie & 18+ Age Verified</span>
                  </div>
                  <p className="text-xs text-emerald-700 mt-1">
                    Your badge is prominently displayed to potential matches across India.
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleStartSelfieVerification}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-md shadow-sky-500/25 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Start Live Selfie Verification</span>
                </button>
              )}
            </div>
          )}

          {activeTab === 'blocked' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500">
                Blocked profiles cannot see your profile, swipe on you, or send you messages and calls.
              </p>
              {blockedCount === 0 ? (
                <div className="py-8 text-center text-gray-400">
                  <UserX className="w-10 h-10 mx-auto stroke-1 text-gray-300 mb-1" />
                  <p className="font-semibold text-xs text-gray-500">No blocked profiles</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    You can block anyone anytime from the 3 dots menu in their chat or profile.
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserX className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-medium text-gray-800">
                      {blockedCount} profiles currently blocked
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.setItem('dilse_blocked_ids_v1', '[]');
                      setActiveTab('blocked');
                    }}
                    className="text-[11px] font-semibold text-rose-600 hover:underline"
                  >
                    Unblock All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
