import React from 'react';
import { Heart, Sparkles, ShieldCheck, Crown, Bell, SlidersHorizontal, Smartphone, Monitor } from 'lucide-react';
import { RelationshipMode, CurrentUser } from '../../types';

interface HeaderProps {
  currentUser: CurrentUser;
  activeMode: RelationshipMode;
  onModeChange: (mode: RelationshipMode) => void;
  onOpenPremium: () => void;
  onOpenSafety: () => void;
  onOpenFilters: () => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activeMode,
  onModeChange,
  onOpenPremium,
  onOpenSafety,
  onOpenFilters,
  isMobileFrame,
  onToggleFrame,
  unreadNotificationsCount = 2
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-pink-100 px-4 py-2.5 shadow-xs">
      <div className="flex items-center justify-between gap-2 max-w-5xl mx-auto">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-pink-600 via-rose-500 to-purple-700 bg-clip-text text-transparent">
                DILMILENGE
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                18+
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-medium -mt-1 hidden sm:block">
              दिल मिलेंगे • Indian Dating & Friendship
            </p>
          </div>
        </div>

        {/* Mode Switcher: Dating (Pyaar), Friendship (Yaari), Serious (Humsafar) */}
        <div className="flex items-center bg-pink-50/80 p-1 rounded-xl border border-pink-100/80 text-xs">
          <button
            onClick={() => onModeChange('dating')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
              activeMode === 'dating'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs'
                : 'text-gray-600 hover:text-pink-600'
            }`}
            title="Dating & Romance"
          >
            <span>💖</span>
            <span className="hidden xs:inline">Dating</span>
          </button>
          <button
            onClick={() => onModeChange('friendship')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
              activeMode === 'friendship'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-xs'
                : 'text-gray-600 hover:text-purple-600'
            }`}
            title="Make Friends (Yaari)"
          >
            <span>🤝</span>
            <span className="hidden xs:inline">Yaari</span>
          </button>
          <button
            onClick={() => onModeChange('serious')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
              activeMode === 'serious'
                ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-amber-700'
            }`}
            title="Serious Relationship (Shaadi)"
          >
            <span>💍</span>
            <span className="hidden xs:inline">Serious</span>
          </button>
        </div>

        {/* Action icons & Perks */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Frame View Toggle (Desktop preview vs Mobile) */}
          <button
            onClick={onToggleFrame}
            className="hidden md:flex p-2 rounded-xl text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            title={isMobileFrame ? 'Switch to Full Screen View' : 'Switch to Mobile Frame Preview'}
          >
            {isMobileFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* Safety Center */}
          <button
            onClick={onOpenSafety}
            className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-colors relative"
            title="Safety Center (18+ & Suraksha)"
          >
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Premium / VIP Button */}
          <button
            onClick={onOpenPremium}
            className="px-2 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white text-xs font-semibold shadow-xs flex items-center gap-1 hover:brightness-105 active:scale-95 transition-all"
          >
            <Crown className="w-3.5 h-3.5 fill-amber-200 text-amber-100" />
            <span className="hidden sm:inline">
              {currentUser.subscription === 'free' ? 'Get Gold' : 'VIP Active'}
            </span>
          </button>

          {/* Filters Button */}
          <button
            onClick={onOpenFilters}
            className="p-2 rounded-xl text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            title="Filter by City, Age, Mode"
          >
            <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
