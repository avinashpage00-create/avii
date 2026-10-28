import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { RotateCcw, X, Star, Heart, Zap, Sparkles, Filter, RefreshCw } from 'lucide-react';
import { UserProfile, RelationshipMode } from '../../types';
import { ProfileCard } from './ProfileCard';
import { playSound } from '../../utils/audio';

interface SwipeDeckProps {
  profiles: UserProfile[];
  onSwipe: (profile: UserProfile, action: 'like' | 'pass' | 'superlike') => void;
  onRewind: () => void;
  canRewind: boolean;
  onOpenBoost: () => void;
  onResetFilters: () => void;
  currentMode: RelationshipMode;
}

export const SwipeDeck: React.FC<SwipeDeckProps> = ({
  profiles,
  onSwipe,
  onRewind,
  canRewind,
  onOpenBoost,
  onResetFilters,
  currentMode
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Motion values for current dragging card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-20, 20]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -120], [0, 1]);
  const superLikeOpacity = useTransform(y, [-20, -100], [0, 1]);

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  const handleDragEnd = (_: unknown, info: { offset: { x: number; y: number } }) => {
    if (!currentProfile) return;

    if (info.offset.x > 100) {
      // Swiped right -> Like
      playSound('like');
      onSwipe(currentProfile, 'like');
      setCurrentIndex(prev => prev + 1);
    } else if (info.offset.x < -100) {
      // Swiped left -> Pass
      playSound('pass');
      onSwipe(currentProfile, 'pass');
      setCurrentIndex(prev => prev + 1);
    } else if (info.offset.y < -100) {
      // Swiped up -> Super Like
      playSound('superlike');
      onSwipe(currentProfile, 'superlike');
      setCurrentIndex(prev => prev + 1);
    }
  };

  const triggerAction = (action: 'like' | 'pass' | 'superlike') => {
    if (!currentProfile) return;
    playSound(action === 'like' ? 'like' : action === 'pass' ? 'pass' : 'superlike');
    onSwipe(currentProfile, action);
    setCurrentIndex(prev => prev + 1);
  };

  const handleRewindClick = () => {
    if (canRewind && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      onRewind();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    onResetFilters();
  };

  // If no more profiles
  if (!currentProfile) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-100 to-purple-100 flex items-center justify-center text-pink-600 mb-4 shadow-inner">
          <Sparkles className="w-10 h-10 animate-pulse text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">That's everyone for now!</h3>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          You've explored all singles matching your current filters. Try relaxing your city or age preferences to find more connections across India.
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Discover Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-3 sm:p-4 max-w-md mx-auto w-full h-[calc(100vh-130px)]">
      {/* Cards Deck Container */}
      <div className="relative w-full flex-1 max-h-[580px] min-h-[460px]">
        {/* Next Card underneath (for visual depth) */}
        {nextProfile && (
          <div className="absolute inset-0 scale-[0.96] translate-y-3 opacity-60 pointer-events-none rounded-3xl overflow-hidden">
            <ProfileCard
              profile={nextProfile}
              onLike={() => {}}
              onPass={() => {}}
              onSuperLike={() => {}}
            />
          </div>
        )}

        {/* Current Active Card with Framer Motion Drag */}
        <motion.div
          key={currentProfile.id}
          style={{ x, y, rotate }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.8}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing z-10"
        >
          {/* LIKE Stamp indicator */}
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-8 left-8 z-30 pointer-events-none border-4 border-emerald-400 bg-emerald-500/20 backdrop-blur-xs text-emerald-300 font-extrabold text-2xl px-4 py-1 rounded-2xl -rotate-12 tracking-wider shadow-lg"
          >
            DIL SE LIKE 💖
          </motion.div>

          {/* NOPE / PASS Stamp indicator */}
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-8 right-8 z-30 pointer-events-none border-4 border-rose-500 bg-rose-600/20 backdrop-blur-xs text-rose-300 font-extrabold text-2xl px-4 py-1 rounded-2xl rotate-12 tracking-wider shadow-lg"
          >
            SKIP ❌
          </motion.div>

          {/* SUPER LIKE Stamp indicator */}
          <motion.div
            style={{ opacity: superLikeOpacity }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 z-30 pointer-events-none border-4 border-amber-400 bg-amber-500/20 backdrop-blur-xs text-amber-300 font-extrabold text-2xl px-4 py-1.5 rounded-2xl tracking-wider shadow-lg whitespace-nowrap"
          >
            SUPER LIKE ⭐
          </motion.div>

          <ProfileCard
            profile={currentProfile}
            onLike={() => triggerAction('like')}
            onPass={() => triggerAction('pass')}
            onSuperLike={() => triggerAction('superlike')}
          />
        </motion.div>
      </div>

      {/* Floating Action Buttons Bar */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 py-3 w-full">
        {/* Rewind */}
        <button
          onClick={handleRewindClick}
          disabled={!canRewind || currentIndex === 0}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${
            canRewind && currentIndex > 0
              ? 'bg-white text-amber-500 hover:bg-amber-50 active:scale-95 border border-amber-100'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed border border-gray-200'
          }`}
          title="Rewind last pass (Undo)"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Pass / Skip */}
        <button
          onClick={() => triggerAction('pass')}
          className="w-14 h-14 rounded-full bg-white text-rose-500 border border-rose-100 shadow-lg hover:bg-rose-50 active:scale-90 transition-all flex items-center justify-center"
          title="Skip profile (Swipe Left)"
        >
          <X className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* Super Like */}
        <button
          onClick={() => triggerAction('superlike')}
          className="w-12 h-12 rounded-full bg-white text-sky-500 border border-sky-100 shadow-md hover:bg-sky-50 active:scale-90 transition-all flex items-center justify-center"
          title="Super Like profile (Swipe Up)"
        >
          <Star className="w-6 h-6 fill-sky-400" />
        </button>

        {/* Like */}
        <button
          onClick={() => triggerAction('like')}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 text-white shadow-xl shadow-pink-500/30 hover:brightness-105 active:scale-90 transition-all flex items-center justify-center"
          title="Like profile (Swipe Right)"
        >
          <Heart className="w-7 h-7 fill-white stroke-[2.5]" />
        </button>

        {/* Boost Profile */}
        <button
          onClick={onOpenBoost}
          className="w-12 h-12 rounded-full bg-white text-purple-600 border border-purple-100 shadow-md hover:bg-purple-50 active:scale-95 transition-all flex items-center justify-center"
          title="Boost Profile to top of city"
        >
          <Zap className="w-5 h-5 fill-purple-500 text-purple-600" />
        </button>
      </div>
    </div>
  );
};
