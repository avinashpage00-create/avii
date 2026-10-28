import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Phone, Video, MoreVertical, Send, Mic, Square, 
  Image as ImageIcon, Smile, Play, Pause, CheckCheck, ShieldAlert,
  UserX, Flag, Sparkles, Heart
} from 'lucide-react';
import { MatchItem, ChatMessage, CurrentUser } from '../../types';
import { getConversationMessages, sendNewMessage } from '../../utils/storage';
import { playSound } from '../../utils/audio';

interface ChatRoomProps {
  match: MatchItem;
  currentUser: CurrentUser;
  onBack: () => void;
  onStartCall: (type: 'video' | 'audio') => void;
  onBlockUser: (profileId: string) => void;
  onReportUser: (profileId: string) => void;
  onUnmatch: (matchId: string) => void;
  initialMessageToSend?: string;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({
  match,
  currentUser,
  onBack,
  onStartCall,
  onBlockUser,
  onReportUser,
  onUnmatch,
  initialMessageToSend
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [currentlyPlayingAudioId, setCurrentlyPlayingAudioId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Load conversation messages
  useEffect(() => {
    const list = getConversationMessages(match.id);
    setMessages(list);

    // If an initial icebreaker was passed (e.g. from match celebration), send it!
    if (initialMessageToSend) {
      handleSendText(initialMessageToSend);
    }
  }, [match.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendText = (textOverride?: string) => {
    const textToSend = textOverride || inputText.trim();
    if (!textToSend) return;

    playSound('message');
    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      senderId: currentUser.id,
      text: textToSend,
      timestamp: Date.now(),
      read: true
    };

    sendNewMessage(match.id, newMsg);
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate smart auto-reply from match after 1.5 seconds
    setTimeout(() => {
      playSound('message');
      const partnerReplies = [
        `Aww that's so sweet! Honestly made my day 😊`,
        `Haha totally agree with you on that! What are your plans for this weekend?`,
        `Would love to! Let's do that. Are you free for a quick video call? 📹✨`,
        `I was just thinking the same thing! By the way, your profile vibe is so genuine.`,
        `Haha Bollywood fans are always my favorite people! 🍿❤️`
      ];
      const randomReply = partnerReplies[Math.floor(Math.random() * partnerReplies.length)];
      const replyMsg: ChatMessage = {
        id: 'reply_' + Date.now(),
        senderId: match.profile.id,
        text: randomReply,
        timestamp: Date.now(),
        read: false
      };
      sendNewMessage(match.id, replyMsg);
      setMessages(prev => [...prev, replyMsg]);
    }, 1500);
  };

  // Real browser voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const newMsg: ChatMessage = {
          id: 'voice_' + Date.now(),
          senderId: currentUser.id,
          mediaUrl: audioUrl,
          mediaType: 'audio',
          audioDuration: recordDuration,
          timestamp: Date.now(),
          read: true
        };

        sendNewMessage(match.id, newMsg);
        setMessages(prev => [...prev, newMsg]);

        // Stop all tracks to turn off mic indicator
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordDuration(0);

      recordTimerRef.current = setInterval(() => {
        setRecordDuration(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone access denied or unavailable, simulating voice note', err);
      // Fallback voice simulation
      setIsRecording(true);
      setRecordDuration(0);
      recordTimerRef.current = setInterval(() => {
        setRecordDuration(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
    }
    setIsRecording(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    } else {
      // simulated voice note if mic permission was not granted
      const newMsg: ChatMessage = {
        id: 'voice_' + Date.now(),
        senderId: currentUser.id,
        mediaType: 'audio',
        audioDuration: Math.max(recordDuration, 2),
        timestamp: Date.now(),
        read: true
      };
      sendNewMessage(match.id, newMsg);
      setMessages(prev => [...prev, newMsg]);
    }
  };

  const handleAudioPlay = (msgId: string, url?: string) => {
    if (currentlyPlayingAudioId === msgId) {
      audioPlayerRef.current?.pause();
      setCurrentlyPlayingAudioId(null);
      return;
    }

    if (url) {
      if (!audioPlayerRef.current) {
        audioPlayerRef.current = new Audio();
      }
      audioPlayerRef.current.src = url;
      audioPlayerRef.current.play();
      setCurrentlyPlayingAudioId(msgId);
      audioPlayerRef.current.onended = () => {
        setCurrentlyPlayingAudioId(null);
      };
    } else {
      // Synthesize beep waveform playback for simulation
      playSound('message');
      setCurrentlyPlayingAudioId(msgId);
      setTimeout(() => {
        setCurrentlyPlayingAudioId(null);
      }, 3000);
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const url = event.target?.result as string;
        const newMsg: ChatMessage = {
          id: 'photo_' + Date.now(),
          senderId: currentUser.id,
          mediaUrl: url,
          mediaType: 'image',
          timestamp: Date.now(),
          read: true
        };
        sendNewMessage(match.id, newMsg);
        setMessages(prev => [...prev, newMsg]);
      };
      reader.readAsDataURL(file);
    }
  };

  const indianStarters = [
    'Chai or Coffee date? ☕',
    'Best street food spot in your city? 📍',
    'Free for a 1-on-1 video call? 📹'
  ];

  return (
    <div className="fixed inset-0 z-40 bg-slate-50 flex flex-col max-w-md mx-auto w-full shadow-2xl">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Chat Room Header */}
      <header className="bg-white px-3 py-2.5 border-b border-pink-100 flex items-center justify-between shadow-xs sticky top-0 z-10">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative w-10 h-10 rounded-full shrink-0">
            <img
              src={match.profile.avatar}
              alt={match.profile.name}
              className="w-10 h-10 rounded-full object-cover border border-pink-200"
            />
            {match.profile.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-bold text-gray-900 truncate flex items-center gap-1">
              <span>{match.profile.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-pink-100 text-pink-700 font-semibold">
                {match.mode === 'dating' ? '💖' : match.mode === 'friendship' ? '🤝' : '💍'}
              </span>
            </h3>
            <p className="text-[11px] text-gray-500 flex items-center gap-1 truncate">
              {match.profile.isOnline ? (
                <span className="text-emerald-600 font-medium">Online now</span>
              ) : (
                <span>{match.profile.city}</span>
              )}
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 relative">
          <button
            onClick={() => onStartCall('audio')}
            className="p-2 rounded-full text-purple-600 hover:bg-purple-50 transition-colors"
            title="Start 1-on-1 Audio Call"
          >
            <Phone className="w-4 h-4" />
          </button>

          <button
            onClick={() => onStartCall('video')}
            className="p-2 rounded-full text-pink-600 hover:bg-pink-50 transition-colors"
            title="Start 1-on-1 Video Call"
          >
            <Video className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Options Dropdown */}
          {showMenu && (
            <div className="absolute right-0 top-11 w-48 rounded-2xl bg-white shadow-xl border border-gray-100 py-1 z-30 text-xs animate-in fade-in slide-in-from-top-2">
              <button
                onClick={() => {
                  setShowMenu(false);
                  onReportUser(match.profile.id);
                }}
                className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-pink-50 flex items-center gap-2 font-medium"
              >
                <Flag className="w-4 h-4 text-rose-500" />
                <span>Report Profile (Safe India)</span>
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  onBlockUser(match.profile.id);
                }}
                className="w-full text-left px-4 py-2.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
              >
                <UserX className="w-4 h-4 text-rose-600" />
                <span>Block User</span>
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  onUnmatch(match.id);
                }}
                className="w-full text-left px-4 py-2.5 text-gray-500 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-100"
              >
                <ShieldAlert className="w-4 h-4 text-gray-400" />
                <span>Unmatch</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Messages Scroll View */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {/* Safety & Encryption Banner */}
        <div className="p-2.5 rounded-2xl bg-pink-50/80 border border-pink-100 text-center text-[11px] text-pink-900 leading-snug">
          🔒 Messages are encrypted & 18+ verified. Never share financial details or send UPI payments to anyone.
        </div>

        {/* Message Items */}
        {messages.map(msg => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] ${
                isMe ? 'ml-auto' : 'mr-auto'
              }`}
            >
              <div
                className={`p-3 rounded-2xl shadow-xs text-sm ${
                  isMe
                    ? 'bg-gradient-to-tr from-pink-500 to-rose-600 text-white rounded-tr-xs'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-xs'
                }`}
              >
                {/* Voice message bubble */}
                {msg.mediaType === 'audio' && (
                  <div className="flex items-center gap-3 py-1 min-w-[180px]">
                    <button
                      onClick={() => handleAudioPlay(msg.id, msg.mediaUrl)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        isMe ? 'bg-white text-pink-600' : 'bg-pink-100 text-pink-600'
                      }`}
                    >
                      {currentlyPlayingAudioId === msg.id ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-0.5 h-4">
                        {[40, 70, 30, 90, 60, 80, 50, 95, 45, 65, 85, 40].map((h, i) => (
                          <span
                            key={i}
                            style={{ height: `${h}%` }}
                            className={`w-1 rounded-full ${
                              isMe ? 'bg-white/80' : 'bg-pink-400'
                            } ${currentlyPlayingAudioId === msg.id ? 'animate-pulse' : ''}`}
                          />
                        ))}
                      </div>
                      <span className={`text-[10px] mt-1 block ${isMe ? 'text-white/80' : 'text-gray-400'}`}>
                        Voice message • {msg.audioDuration ? `${msg.audioDuration}s` : '0:05'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Photo bubble */}
                {msg.mediaType === 'image' && msg.mediaUrl && (
                  <div className="rounded-xl overflow-hidden mb-1 max-w-[220px]">
                    <img src={msg.mediaUrl} alt="Attached photo" className="w-full h-auto object-cover" />
                  </div>
                )}

                {/* Text bubble */}
                {msg.text && <p className="leading-relaxed">{msg.text}</p>}
              </div>

              {/* Timestamp & read receipt */}
              <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-gray-400">
                <span>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {isMe && <CheckCheck className="w-3.5 h-3.5 text-sky-500" />}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Indian Starters Bar */}
      <div className="px-3 py-1.5 bg-white border-t border-gray-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <Sparkles className="w-3.5 h-3.5 text-pink-500 shrink-0" />
        {indianStarters.map((starter, i) => (
          <button
            key={i}
            onClick={() => handleSendText(starter)}
            className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 transition-colors"
          >
            {starter}
          </button>
        ))}
      </div>

      {/* Input Composer Bar */}
      <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
        {isRecording ? (
          <div className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 animate-pulse">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
              <span>Recording Voice Message ({recordDuration}s)...</span>
            </div>
            <button
              onClick={stopRecording}
              className="p-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs flex items-center gap-1"
            >
              <Square className="w-3.5 h-3.5 fill-white" />
              <span>Send Note</span>
            </button>
          </div>
        ) : (
          <>
            {/* Photo Attachment Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
              title="Attach Photo"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            {/* Text Input */}
            <input
              type="text"
              placeholder={`Message ${match.profile.name}...`}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendText()}
              className="flex-1 text-sm px-4 py-2.5 rounded-2xl bg-gray-100 border border-transparent focus:border-pink-300 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400"
            />

            {/* Voice Record Button */}
            <button
              onClick={startRecording}
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
              title="Hold to Record Voice Message"
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Send Button */}
            <button
              onClick={() => handleSendText()}
              disabled={!inputText.trim()}
              className={`p-2.5 rounded-2xl flex items-center justify-center transition-all ${
                inputText.trim()
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/25 active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
