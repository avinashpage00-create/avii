import React, { useState } from 'react';
import { Search, Flame, Crown, Heart, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { MatchItem, RelationshipMode, CurrentUser } from '../../types';

interface MatchesListProps {
  matches: MatchItem[];
  currentUser: CurrentUser;
  onSelectMatch: (match: MatchItem) => void;
  onOpenLikesMe: () => void;
}

export const MatchesList: React.FC<MatchesListProps> = ({
  matches,
  currentUser,
  onSelectMatch,
  onOpenLikesMe
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | RelationshipMode>('all');

  const filteredMatches = matches.filter(match => {
    const matchesName = match.profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        match.profile.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilterMode = filterMode === 'all' || match.mode === filterMode;
    return matchesName && matchesFilterMode;
  });

  const formatTime = (ts: number) => {
    const diffHours = Math.floor((Date.now() - ts) / 3600000);
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="flex-1 flex flex-col max-w-md mx-auto w-full pb-20">
      {/* Search Header */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search matches or cities..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-2xl bg-gray-100 border border-transparent focus:border-pink-300 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Top Carousel: New Matches & "Likes You" badge */}
      <div className="px-4 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>New Matches ({matches.length})</span>
          </h3>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {/* "See Who Liked You" circle */}
          <button
            onClick={onOpenLikesMe}
            className="flex flex-col items-center shrink-0 group"
          >
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
                <Crown className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
                <span className="text-[10px] font-bold text-amber-200 mt-0.5">5 Likes</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-gray-700 mt-1">Likes You</span>
          </button>

          {/* New Match circles */}
          {matches.map(match => (
            <button
              key={match.id}
              onClick={() => onSelectMatch(match)}
              className="flex flex-col items-center shrink-0 group relative"
            >
              <div className="relative w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 to-purple-600 group-hover:scale-105 transition-transform">
                <img
                  src={match.profile.avatar}
                  alt={match.profile.name}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
                {match.profile.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-xs" />
                )}
              </div>
              <span className="text-[11px] font-medium text-gray-700 mt-1 max-w-[64px] truncate">
                {match.profile.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs for Conversations */}
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-100 text-xs">
        <button
          onClick={() => setFilterMode('all')}
          className={`px-3 py-1 rounded-xl font-medium transition-all ${
            filterMode === 'all'
              ? 'bg-pink-100 text-pink-700 font-semibold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          All Chats
        </button>
        <button
          onClick={() => setFilterMode('dating')}
          className={`px-3 py-1 rounded-xl font-medium transition-all ${
            filterMode === 'dating'
              ? 'bg-rose-100 text-rose-700 font-semibold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          💖 Dating
        </button>
        <button
          onClick={() => setFilterMode('friendship')}
          className={`px-3 py-1 rounded-xl font-medium transition-all ${
            filterMode === 'friendship'
              ? 'bg-purple-100 text-purple-700 font-semibold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          🤝 Yaari
        </button>
        <button
          onClick={() => setFilterMode('serious')}
          className={`px-3 py-1 rounded-xl font-medium transition-all ${
            filterMode === 'serious'
              ? 'bg-amber-100 text-amber-800 font-semibold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          💍 Serious
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
        {filteredMatches.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <MessageCircle className="w-12 h-12 mx-auto stroke-1 text-gray-300 mb-2" />
            <p className="text-sm font-medium text-gray-600">No conversations here yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Swipe right on profiles in Discover to create new matches!
            </p>
          </div>
        ) : (
          filteredMatches.map(match => (
            <div
              key={match.id}
              onClick={() => onSelectMatch(match)}
              className="flex items-center gap-3.5 px-4 py-3 hover:bg-pink-50/40 active:bg-pink-100/50 cursor-pointer transition-colors"
            >
              <div className="relative w-13 h-13 rounded-full shrink-0">
                <img
                  src={match.profile.avatar}
                  alt={match.profile.name}
                  className="w-13 h-13 rounded-full object-cover border border-gray-100 shadow-xs"
                />
                {match.profile.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-xs" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-gray-900 truncate">
                      {match.profile.name}
                    </h4>
                    {match.profile.isVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    )}
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-pink-50 text-pink-600 font-semibold border border-pink-100">
                      {match.mode === 'dating' ? '💖' : match.mode === 'friendship' ? '🤝' : '💍'}
                    </span>
                  </div>

                  {match.lastMessage && (
                    <span className="text-[11px] text-gray-400 shrink-0">
                      {formatTime(match.lastMessage.timestamp)}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p
                    className={`text-xs truncate pr-2 ${
                      match.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'
                    }`}
                  >
                    {match.lastMessage ? (
                      match.lastMessage.mediaType === 'audio' ? (
                        '🎤 Voice note sent'
                      ) : match.lastMessage.mediaType === 'image' ? (
                        '📷 Photo sent'
                      ) : (
                        match.lastMessage.text
                      )
                    ) : (
                      'Say namaste to start the chat!'
                    )}
                  </p>

                  {match.unreadCount > 0 && (
                    <span className="shrink-0 w-5 h-5 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                      {match.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
