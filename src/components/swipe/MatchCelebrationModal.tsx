import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, MessageCircle, Video, X, Sparkles } from 'lucide-react';
import { CurrentUser, UserProfile } from '../../types';
import { playSound } from '../../utils/audio';

interface MatchCelebrationModalProps {
  currentUser: CurrentUser;
  matchedProfile: UserProfile;
  onSendMessage: (initialText?: string) => void;
  onStartVideoCall: () => void;
  onClose: () => void;
}

export const MatchCelebrationModal: React.FC<MatchCelebrationModalProps> = ({
  currentUser,
  matchedProfile,
  onSendMessage,
  onStartVideoCall,
  onClose
}) => {
  useEffect(() => {
    playSound('match');

    // Trigger colorful confetti fanfare
    const count = 200;
    const defaults = {
      origin: { y: 0.6 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#ec4899', '#8b5cf6', '#fbbf24']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#f43f5e', '#a855f7', '#38bdf8']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#e11d48', '#7c3aed', '#ffffff']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, []);

  const icebreakers = [
    `Chai on me this weekend in ${matchedProfile.city}? ☕`,
    'What’s your all-time favorite Bollywood film? 🎬',
    'Free for a quick hello on video call? 📹✨'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950 border border-pink-500/30 p-6 text-center shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>It's a Mutual Match!</span>
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 bg-clip-text text-transparent">
          Aapka Milan Ho Gaya!
        </h2>
        <p className="text-sm text-slate-300 mt-1">
          You and <span className="font-semibold text-white">{matchedProfile.name}</span> liked each other Dil Se.
        </p>

        {/* Two Avatars with pulsing heart */}
        <div className="relative flex items-center justify-center my-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-500 shadow-xl -mr-4 z-10">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Heart Badge */}
          <div className="absolute z-20 w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 border-2 border-white flex items-center justify-center shadow-lg animate-bounce">
            <Heart className="w-6 h-6 fill-white text-white" />
          </div>

          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500 shadow-xl -ml-4 z-10">
            <img
              src={matchedProfile.avatar}
              alt={matchedProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Icebreaker Suggestions */}
        <div className="space-y-2 mb-6">
          <p className="text-xs text-slate-400 font-medium">Break the ice instantly:</p>
          <div className="space-y-1.5">
            {icebreakers.map((msg, i) => (
              <button
                key={i}
                onClick={() => onSendMessage(msg)}
                className="w-full text-left text-xs p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 flex items-center justify-between group"
              >
                <span className="text-slate-200 group-hover:text-white truncate">{msg}</span>
                <span className="text-pink-400 text-xs font-semibold ml-2">Send →</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => onSendMessage()}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-pink-500/25 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat With {matchedProfile.name}</span>
          </button>

          <button
            onClick={onStartVideoCall}
            className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4 text-purple-400" />
            <span>Start 1-on-1 Video Call</span>
          </button>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition-colors pt-1"
          >
            Keep Exploring More Singles
          </button>
        </div>
      </div>
    </div>
  );
};
