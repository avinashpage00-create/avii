import React, { useState } from 'react';
import { 
  Edit3, ShieldCheck, Crown, Zap, Settings, RefreshCcw, 
  MapPin, Briefcase, Heart, Sparkles, CheckCircle2, UserCheck, Eye, LogOut
} from 'lucide-react';
import { CurrentUser, SubscriptionTier } from '../../types';

interface UserProfileViewProps {
  currentUser: CurrentUser;
  onEditProfile: () => void;
  onOpenPremium: () => void;
  onOpenSafety: () => void;
  onSwitchPerspective: () => void;
  onToggleBoost: () => void;
  onResetData: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  currentUser,
  onEditProfile,
  onOpenPremium,
  onOpenSafety,
  onSwitchPerspective,
  onToggleBoost,
  onResetData
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [incognito, setIncognito] = useState(false);
  const [onlineStatusVisible, setOnlineStatusVisible] = useState(true);

  return (
    <div className="flex-1 flex flex-col max-w-md mx-auto w-full pb-24 overflow-y-auto">
      {/* Top Profile Banner */}
      <div className="relative p-5 bg-gradient-to-b from-pink-500/10 via-purple-500/5 to-transparent flex flex-col items-center text-center">
        {/* Avatar with gold ring & badge */}
        <div className="relative mb-3">
          <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 shadow-xl">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>

          {currentUser.isVerified && (
            <div
              className="absolute bottom-1 right-1 p-1 bg-white rounded-full shadow-md text-sky-500"
              title="18+ Verified Profile"
            >
              <ShieldCheck className="w-6 h-6 fill-sky-500 text-white" />
            </div>
          )}

          {currentUser.subscription !== 'free' && (
            <div
              className="absolute top-0 right-0 p-1 bg-gradient-to-tr from-amber-400 to-rose-500 rounded-full shadow-md text-white"
              title="VIP Active"
            >
              <Crown className="w-5 h-5 fill-current" />
            </div>
          )}
        </div>

        <h2 className="text-2xl font-black text-gray-900 flex items-center justify-center gap-1.5">
          <span>{currentUser.name}, {currentUser.age}</span>
        </h2>

        <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-0.5">
          <MapPin className="w-3.5 h-3.5 text-pink-500" />
          <span>{currentUser.city}</span>
          <span>•</span>
          <Briefcase className="w-3.5 h-3.5 text-purple-500" />
          <span>{currentUser.profession}</span>
        </p>

        {/* Edit Profile & Safety Buttons */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={onEditProfile}
            className="px-4 py-2 rounded-2xl bg-white border border-gray-200 text-gray-800 text-xs font-bold shadow-xs hover:bg-gray-50 flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Edit3 className="w-3.5 h-3.5 text-pink-600" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={onOpenSafety}
            className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs hover:bg-emerald-100 flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Suraksha (18+)</span>
          </button>
        </div>
      </div>

      {/* Profile Metrics & Actions */}
      <div className="px-4 space-y-3">
        {/* VIP Membership Banner */}
        <div
          onClick={onOpenPremium}
          className="p-4 rounded-3xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-lg shadow-pink-500/15 cursor-pointer hover:brightness-105 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-200">
              <Crown className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm">
                {currentUser.subscription === 'free' ? 'Upgrade to DILMILENGE Gold' : 'DILMILENGE VIP Member'}
              </h4>
              <p className="text-[11px] text-amber-100 font-medium">
                {currentUser.subscription === 'free'
                  ? 'See who liked you & unlimited swiping'
                  : 'All VIP perks active across India'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-xl">
            {currentUser.subscription === 'free' ? 'Get VIP →' : 'Active'}
          </span>
        </div>

        {/* Quick Profile Tools */}
        <div className="grid grid-cols-2 gap-3">
          {/* Boost Card */}
          <div
            onClick={onToggleBoost}
            className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-100 cursor-pointer hover:bg-purple-100/60 transition-all"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                <Zap className="w-4 h-4 fill-white" />
              </span>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-200/60 px-1.5 py-0.5 rounded-md">
                1 Free
              </span>
            </div>
            <h5 className="font-bold text-xs text-gray-900">Boost Profile</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">Top in {currentUser.city} for 30m</p>
          </div>

          {/* Test Perspectives Switcher (Demonstrator superpower!) */}
          <div
            onClick={onSwitchPerspective}
            className="p-3.5 rounded-2xl bg-pink-50/80 border border-pink-100 cursor-pointer hover:bg-pink-100/60 transition-all"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="w-8 h-8 rounded-xl bg-pink-600 text-white flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-white" />
              </span>
              <span className="text-[10px] font-bold text-pink-700 bg-pink-200/60 px-1.5 py-0.5 rounded-md">
                Switch
              </span>
            </div>
            <h5 className="font-bold text-xs text-gray-900">Switch Perspective</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Testing as: {currentUser.gender === 'male' ? 'Boy (Aryan)' : 'Girl (Ananya)'}
            </p>
          </div>
        </div>

        {/* Bio Preview */}
        <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-3">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">My Bio</h4>
            <p className="text-xs text-gray-700 leading-relaxed">{currentUser.bio}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Looking For
            </h4>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-pink-50 text-pink-700 font-semibold text-xs border border-pink-100">
              <span>{currentUser.relationshipMode === 'dating' ? '💖 Dating & Romance' : currentUser.relationshipMode === 'friendship' ? '🤝 Yaari & Friends' : '💍 Serious (Shaadi)'}</span>
            </div>
          </div>

          {/* Prompts */}
          {currentUser.prompts && currentUser.prompts.length > 0 && (
            <div className="space-y-2 pt-1">
              {currentUser.prompts.map((p, i) => (
                <div key={i} className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-[11px] font-bold text-pink-600 block">{p.question}</span>
                  <span className="text-xs text-gray-800 font-medium mt-0.5 block">"{p.answer}"</span>
                </div>
              ))}
            </div>
          )}

          {/* Hobbies */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Passions
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {currentUser.hobbies.map((h, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-2.5 py-1 rounded-xl bg-purple-50 text-purple-700 border border-purple-100"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Settings & Privacy toggles */}
        <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-gray-500" />
            <span>Privacy & Safety Controls</span>
          </h4>

          <div className="flex items-center justify-between text-xs py-1">
            <div>
              <span className="font-semibold text-gray-800 block">Incognito Mode</span>
              <span className="text-gray-400 text-[11px]">Only be visible to profiles you like</span>
            </div>
            <button
              onClick={() => setIncognito(!incognito)}
              className={`w-10 h-6 rounded-full transition-colors relative ${
                incognito ? 'bg-pink-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  incognito ? 'left-5' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <div>
              <span className="font-semibold text-gray-800 block">Show Online Status</span>
              <span className="text-gray-400 text-[11px]">Let matches know when you are active</span>
            </div>
            <button
              onClick={() => setOnlineStatusVisible(!onlineStatusVisible)}
              className={`w-10 h-6 rounded-full transition-colors relative ${
                onlineStatusVisible ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  onlineStatusVisible ? 'left-5' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={onResetData}
              className="text-xs text-rose-600 font-bold hover:underline flex items-center gap-1"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Swipes & Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
