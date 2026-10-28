import React, { useEffect } from 'react';
import { Phone, PhoneOff, Video, Sparkles, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../../types';
import { playSound } from '../../utils/audio';

interface IncomingCallModalProps {
  caller: UserProfile;
  callType: 'video' | 'audio';
  onAccept: () => void;
  onDecline: () => void;
}

export const IncomingCallModal: React.FC<IncomingCallModalProps> = ({
  caller,
  callType,
  onAccept,
  onDecline
}) => {
  useEffect(() => {
    // Ring chime interval
    playSound('ring');
    const ringInterval = setInterval(() => {
      playSound('ring');
    }, 2800);
    return () => clearInterval(ringInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-between p-6 max-w-md mx-auto w-full text-white animate-in fade-in duration-200">
      {/* Top Caller Info */}
      <div className="flex flex-col items-center text-center mt-12 space-y-3">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-pink-500/30 animate-ping" />
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-pink-500 shadow-2xl">
            <img src={caller.avatar} alt={caller.name} className="w-full h-full object-cover" />
          </div>
          {caller.isVerified && (
            <ShieldCheck className="w-6 h-6 text-sky-400 absolute bottom-0 right-0 bg-white rounded-full" />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">{caller.name}</h2>
          <p className="text-sm text-pink-300 font-medium mt-1">
            Incoming {callType === 'video' ? 'Video' : 'Audio'} Call from {caller.city}...
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-xs text-pink-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DilSe Verified Connection</span>
        </div>
      </div>

      {/* Decline & Accept Buttons */}
      <div className="w-full flex items-center justify-around mb-12">
        {/* Decline Button */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onDecline}
            className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-xl shadow-rose-600/40 active:scale-95 transition-all"
            title="Decline Call"
          >
            <PhoneOff className="w-7 h-7" />
          </button>
          <span className="text-xs text-slate-300 font-medium">Decline</span>
        </div>

        {/* Accept Button */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onAccept}
            className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/40 animate-bounce active:scale-95 transition-all"
            title="Accept Call"
          >
            {callType === 'video' ? <Video className="w-7 h-7" /> : <Phone className="w-7 h-7" />}
          </button>
          <span className="text-xs text-emerald-400 font-medium">Accept Call</span>
        </div>
      </div>
    </div>
  );
};
