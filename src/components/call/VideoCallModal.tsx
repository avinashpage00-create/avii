import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, PhoneOff, RotateCcw, 
  Heart, Sparkles, Volume2, ShieldCheck, Smile
} from 'lucide-react';
import { UserProfile } from '../../types';
import { playSound } from '../../utils/audio';

interface VideoCallModalProps {
  partner: UserProfile;
  callType: 'video' | 'audio';
  onEndCall: () => void;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  partner,
  callType,
  onEndCall
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === 'audio');
  const [duration, setDuration] = useState(0);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected'>('connecting');
  const [hearts, setHearts] = useState<{ id: number; left: number }[]>([]);
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('user');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // Initialize camera and microphone
  useEffect(() => {
    let active = true;

    async function initMedia() {
      try {
        playSound('ring');
        const stream = await navigator.mediaDevices.getUserMedia({
          video: callType === 'video',
          audio: true
        });

        if (!active) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn('Local media access denied or not available, proceeding in simulated stream mode', err);
      }

      // Simulate connection established after 2.5 seconds
      setTimeout(() => {
        if (active) {
          setCallStatus('connected');
        }
      }, 2500);
    }

    initMedia();

    return () => {
      active = false;
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [callType]);

  // Duration timer when connected
  useEffect(() => {
    if (callStatus !== 'connected') return;
    const interval = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callStatus]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = isMuted; // toggling
      });
    }
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = isVideoOff; // toggling
      });
    }
  };

  const handleEndCall = () => {
    playSound('call_end');
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    onEndCall();
  };

  const sendHeartReaction = () => {
    playSound('like');
    const newHeart = { id: Date.now(), left: Math.floor(Math.random() * 60) + 20 };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2000);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between max-w-md mx-auto w-full text-white overflow-hidden shadow-2xl select-none">
      {/* Top Bar */}
      <div className="relative z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src={partner.avatar}
              alt={partner.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-pink-400"
            />
            {partner.isVerified && (
              <ShieldCheck className="w-4 h-4 text-sky-400 absolute -bottom-1 -right-1" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight">{partner.name}</h3>
            <p className="text-xs text-pink-300 font-medium">
              {callStatus === 'connecting' ? (
                <span className="animate-pulse">Calling {partner.city}...</span>
              ) : (
                <span className="text-emerald-400 font-mono">{formatTime(duration)}</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>HD 1080p Encrypted</span>
        </div>
      </div>

      {/* Main Video View: Matched Partner */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden bg-slate-900">
        {callType === 'video' ? (
          <div className="relative w-full h-full">
            <img
              src={partner.photos[0] || partner.avatar}
              alt={partner.name}
              className={`w-full h-full object-cover filter ${
                callStatus === 'connecting' ? 'brightness-75 blur-xs scale-105' : 'brightness-100 scale-100'
              } transition-all duration-700`}
            />

            {/* Speaking animation waves */}
            {callStatus === 'connected' && (
              <div className="absolute bottom-28 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-xs font-medium border border-white/10">
                <Volume2 className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                <span>{partner.name.split(' ')[0]} is speaking</span>
                <div className="flex items-center gap-0.5 ml-1">
                  <span className="w-1 h-3 bg-pink-400 rounded-full animate-pulse" />
                  <span className="w-1 h-4 bg-pink-400 rounded-full animate-pulse delay-75" />
                  <span className="w-1 h-2 bg-pink-400 rounded-full animate-pulse delay-150" />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Audio Call View with Pulsing Rings */
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-pink-500/20 animate-ping" />
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-pink-500 shadow-2xl">
                <img src={partner.avatar} alt={partner.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <h2 className="text-xl font-bold">{partner.name}</h2>
            <p className="text-xs text-slate-400">Audio Call • {partner.city}</p>
          </div>
        )}

        {/* Self Picture-in-Picture Video */}
        {callType === 'video' && (
          <div className="absolute top-20 right-4 w-28 h-40 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/40 bg-slate-800 z-30">
            {!isVideoOff ? (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-xs text-slate-400">
                <VideoOff className="w-6 h-6 mb-1 text-slate-500" />
                <span>Camera Off</span>
              </div>
            )}
            <div className="absolute bottom-1 left-2 text-[10px] bg-black/60 px-1.5 py-0.5 rounded-md text-white font-medium">
              You
            </div>
          </div>
        )}

        {/* Floating Heart Reactions */}
        {hearts.map(h => (
          <div
            key={h.id}
            style={{ left: `${h.left}%` }}
            className="absolute bottom-24 z-40 text-pink-500 animate-bounce pointer-events-none transform -translate-y-24 transition-all duration-1000"
          >
            <Heart className="w-10 h-10 fill-pink-500 text-pink-500 drop-shadow-lg" />
          </div>
        ))}
      </div>

      {/* Floating Bottom Controls */}
      <div className="relative z-20 p-5 bg-gradient-to-t from-black/90 via-black/70 to-transparent flex items-center justify-around">
        {/* Toggle Mute */}
        <button
          onClick={toggleMute}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isMuted ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md'
          }`}
          title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Toggle Video */}
        {callType === 'video' && (
          <button
            onClick={toggleVideo}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isVideoOff ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md'
            }`}
            title={isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>
        )}

        {/* Send Heart Reaction */}
        <button
          onClick={sendHeartReaction}
          className="w-12 h-12 rounded-full bg-pink-500/80 hover:bg-pink-500 text-white backdrop-blur-md flex items-center justify-center shadow-lg shadow-pink-500/30 active:scale-90 transition-all"
          title="Send Heart Reaction"
        >
          <Heart className="w-5 h-5 fill-white" />
        </button>

        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-xl shadow-rose-600/40 flex items-center justify-center active:scale-95 transition-all"
          title="End Call"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
